import * as dogapi from 'dogapi';
import * as _ from 'lodash';

export default class DataDog {

    /**
     * Translate domains to friendly names.
     */
    domains: any = {
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
     * Constructor.
     */
    public constructor() {
        const options: Options = {
            api_key: process.env.DD_API_KEY,
            app_key: process.env.DD_APP_KEY,
        };

        dogapi.initialize(options);
    }

    /**
     * Query a DataDog metric.
     *
     * @param {string} query
     * @param {number} period
     * @returns {Promise<DataDogSeriesData[]>}
     */
    public queryMetric(query: string, period: number = 86400): Promise<DataDogSeriesData[]> {
        const now: number = dogapi.now();
        const then: number = now - period;

        return new Promise((resolve, reject) => dogapi.metric.query(then, now, query, (err: Error, res: DataDogMetricData) => {
            if (err) {
                return reject(err);
            }

            resolve(this.transformMetricResponse(res));
        }));
    }

    /**
     * Return the mean value for a metric query.
     *
     * @param {string} query
     * @param {number} period
     * @returns {any}
     */
    public async averageMetric(query: string, period: number = 2629746): Promise<any> {
        const data: DataDogSeriesData[] = await this.queryMetric(query, period);

        const results: any = data.map((domain: DataDogSeriesData) => {
            const values: number[] = domain.pointlist.map((points: number[]): number => points[1]);
            const average: number = values.reduce((accumulator: number, currentValue: number): number => accumulator + currentValue, 0) / values.length;

            return {
                scope: domain.scope,
                average: average.toFixed(2),
            };
        });

        return results;
    }

    /**
     * Get a DataDog monitor state.
     *
     * @param {number} id
     * @returns {Promise<string>}
     */
    public getMonitor(id: number): Promise<string> {
        return new Promise(resolve => dogapi.monitor.get(id, (err, res) => resolve(res.overall_state)));
    }

    /**
     * Transform DataDog API response.
     *
     * @param {DataDogMetricData} res
     * @returns {DataDogSeriesData[]}
     */
    private transformMetricResponse(res: DataDogMetricData): DataDogSeriesData[] {
        return _.map(res.series, (item: DataDogSeriesData) => ({
            scope: item.scope,
            pointlist: this.transformPointList(item.pointlist),
        }));
    }

    /**
     * Transform pointlist data.
     *
     * @param pointlist
     * @returns {number[][]}
     */
    private transformPointList(pointlist: any): number[][] {
        return _.map(pointlist, (item: any) => ([
            item[0],
            item[1] ? parseFloat(item[1].toFixed(5)) : null,
        ]));
    }

    /**
     * Filter scopes to only include specific domains.
     *
     * @param {DataDogSeriesData[]} items
     * @returns {DataDogSeriesData[]}
     */
    private filterScopes(items: DataDogSeriesData[]): DataDogSeriesData[] {
        const values = _.filter(items, (item: DataDogSeriesData) => this.domains[item.scope]);

        return _.map(values, (item: DataDogSeriesData) => {
            item.scope = this.domains[item.scope];

            return item;
        });
    }
}
