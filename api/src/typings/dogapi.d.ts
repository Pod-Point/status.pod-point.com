declare module 'dogapi' {
    export function initialize(options: Options): void;
    export function now(): number;
    export const metric: {
        query(then: number, now: number, query: string, callback: (err: Error, res: any) => void): void;
    };
    export const monitor: {
        get(id: number, callback: (err: Error, res: any) => void): void;
    };
}

interface Options {
    api_key: string;
    app_key: string;
}

interface DataDogSeriesData {
    scope: string;
    pointlist: number[][];
}

interface DataDogMetricData {
    status: string;
    series: DataDogSeriesData[];
}
