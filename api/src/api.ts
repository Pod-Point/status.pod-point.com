import { Context, APIGatewayEvent, Callback, ProxyResult } from 'aws-lambda';
import CloudWatch from './lib/cloudwatch';

/**
 * Handle status API lambda function.
 *
 * @param {APIGatewayEvent} event
 * @param {Context} context
 * @param {Callback} callback
 * @returns {Promise<void>}
 */
export async function handler(event: APIGatewayEvent, context: Context, callback: Callback) {
    const cloudwatch = new CloudWatch();

    const uptime: any = await cloudwatch.getHealthCheckMonthlyStats();
    const availability: any = await cloudwatch.getHealthCheckDailyStats();

    const response: ProxyResult = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify({
            metrics: {
                uptime,
                availability,
            },
        }),
    };

    callback(null, response);
}
