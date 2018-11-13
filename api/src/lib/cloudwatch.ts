import * as AWS from 'aws-sdk';
import * as _ from 'lodash';

export default class DataDog {

    cloudwatch: AWS.CloudWatch;

    /**
     * Constructor.
     */
    public constructor() {
        this.cloudwatch = new AWS.CloudWatch({
            region: 'us-east-1',
        });
    }

    /**
     * Get monthly average foute 53 health check values
     */
    public getHealthCheckMonthlyStats(): Promise<any> {
        const ms = 1000 * 60 * 5;
        const date = new Date();
        const endTime = new Date(Math.round(date.getTime() / ms) * ms);
        const startTime = new Date(endTime.getTime());
        startTime.setDate(startTime.getDate() - 30);

        const params = {
            EndTime: endTime,
            MetricDataQueries: [
                {
                    Id: 'api',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '1369dc17-86d4-4846-97b1-d2fc93f0b0d5', // api.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 2592000,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'open',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '11ef1f50-aa28-4693-aafe-0fa63e0f2af2', // open.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 2592000,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'cms',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '28f17cba-7539-4f8a-b959-487ea7c7c753', // pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 2592000,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'auth',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '61f25c33-ad94-42a2-82b8-3740f79c5eae', // auth.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 2592000,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'manage',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '7ca89ab7-7798-4154-9d42-9b505b01fd65', // manage.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 2592000,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'dealerships',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '7f36022c-a195-4729-9f9f-4622116a67d2', // dealerships.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 2592000,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'ocpp',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '82da0c2a-4228-44ad-94e2-6e73c8c6c31b', // ocpp.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 2592000,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'checkout',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '830b5e18-3ab7-47f5-88a5-8c743de277e2', // checkout.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 2592000,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'ordering',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: 'ecb8904f-fe15-4fc3-9b21-227d89d9954c', // ordering.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 2592000,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
            ],
            StartTime: startTime,
        };

        return new Promise((resolve, reject) => this.cloudwatch.getMetricData(params, (err: Error, res: any) => {
            if (err) {
                return reject(err);
            }

            resolve(res.MetricDataResults.map((item: any) => ({
                id: item.Id,
                timestamp: item.Timestamps[0],
                value: item.Values[0],
            })));
        }));
    }

    /**
     * Get daily average foute 53 health check values
     */
    public getHealthCheckDailyStats(): Promise<any> {
        const ms = 1000 * 60 * 5;
        const date = new Date();
        const endTime = new Date(Math.round(date.getTime() / ms) * ms);
        const startTime = new Date(endTime.getTime());
        startTime.setDate(startTime.getDate() - 30);

        const params = {
            EndTime: endTime,
            MetricDataQueries: [
                {
                    Id: 'api',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '1369dc17-86d4-4846-97b1-d2fc93f0b0d5', // api.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 86400,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'open',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '11ef1f50-aa28-4693-aafe-0fa63e0f2af2', // open.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 86400,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'cms',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '28f17cba-7539-4f8a-b959-487ea7c7c753', // pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 86400,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'auth',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '61f25c33-ad94-42a2-82b8-3740f79c5eae', // auth.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 86400,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'manage',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '7ca89ab7-7798-4154-9d42-9b505b01fd65', // manage.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 86400,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'dealerships',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '7f36022c-a195-4729-9f9f-4622116a67d2', // dealerships.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 86400,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'ocpp',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '82da0c2a-4228-44ad-94e2-6e73c8c6c31b', // ocpp.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 86400,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'checkout',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: '830b5e18-3ab7-47f5-88a5-8c743de277e2', // checkout.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 86400,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
                {
                    Id: 'ordering',
                    MetricStat: {
                        Metric: {
                            Dimensions: [
                                {
                                    Name: 'HealthCheckId',
                                    Value: 'ecb8904f-fe15-4fc3-9b21-227d89d9954c', // ordering.pod-point.com
                                },
                            ],
                            MetricName: 'HealthCheckPercentageHealthy',
                            Namespace: 'AWS/Route53',
                        },
                        Period: 86400,
                        Stat: 'Average',
                        Unit: 'Percent',
                    },
                },
            ],
            StartTime: startTime,
        };

        return new Promise((resolve, reject) => this.cloudwatch.getMetricData(params, (err: Error, res: any) => {
            if (err) {
                return reject(err);
            }

            resolve(res.MetricDataResults.map((item: any) => ({
                id: item.Id,
                timestamps: item.Timestamps,
                values: item.Values,
            })));
        }));
    }
}
