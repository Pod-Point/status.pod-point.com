import { Context, APIGatewayEvent, Callback, ProxyResult } from 'aws-lambda';
import DataDog from './lib/datadog';
import * as _ from 'lodash';

/**
 * Translate domains to friendly names.
 */
const domains: any = {
    'name:api.pod-point.com': 'API',
    'name:auth.pod-point.com': 'Auth',
    'name:checkout.pod-point.com': 'Checkout',
    'name:commission.pod-point.com': 'Commissioning',
    'name:dealerships.pod-point.com': 'Dealerships',
    'name:manage.pod-point.com': 'MIS',
    'name:norway.pod-point.com': 'Norway',
    'name:ocpp.pod-point.com': 'OCPP',
    'name:open.pod-point.com': 'Open Charge',
    'name:ordering.pod-point.com': 'Ordering',
    'name:pdf.pod-point.com': 'PDF',
    'name:pod-point.com': 'Website',
};

/**
 * Handle status API lambda function.
 *
 * @param {APIGatewayEvent} event
 * @param {Context} context
 * @param {Callback} callback
 * @returns {Promise<void>}
 */
export async function handler(event: APIGatewayEvent, context: Context, callback: Callback) {
    const datadog = new DataDog();

    const availability: DataDogSeriesData[] = await datadog.queryMetric('avg:aws.route53.health_check_percentage_healthy{*} by {name}');
    const responseTime: DataDogSeriesData[] = await datadog.queryMetric('avg:podpoint.api.request.time.median{*} by {availability-zone}');
    const podEvents: DataDogSeriesData[] = await datadog.queryMetric('avg:aws.sns.number_of_messages_published{topicname:pod-unit-event-received}.as_count()');

    const uptime: any = await datadog.averageMetric('avg:aws.route53.health_check_percentage_healthy{*} by {name}');

    const response: ProxyResult = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify({
            uptime: filterScopes(uptime),
            metrics: {
                responseTime,
                podEvents,
                availability: filterScopes(availability),
            },
        }),
    };

    callback(null, response);
}

/**
 * Filter scopes to only include specific domains.
 *
 * @param {DataDogSeriesData[]} items
 * @returns {DataDogSeriesData[]}
 */
function filterScopes(items: DataDogSeriesData[]): DataDogSeriesData[] {
    const values = _.filter(items, (item: DataDogSeriesData) => domains[item.scope]);

    return _.map(values, (item: DataDogSeriesData) => {
        item.scope = domains[item.scope];

        return item;
    });
}
