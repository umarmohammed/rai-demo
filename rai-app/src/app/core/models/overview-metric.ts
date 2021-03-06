import { Metric, metricArrayToGridArray } from './metric';

export interface OverviewMetric {
  name: string;
  histogram: Bin[];
  aggregates: Metric[];
  type: string;
}

export interface Bin {
  interval: number;
  frequency: number;
}

export function filterOverviewMetricsByType(type: string) {
  return (overviewMetric: OverviewMetric[]) =>
    overviewMetric && overviewMetric.filter((o) => o.type == type);
}

export function overviewMetricToGridArray(metric: OverviewMetric) {
  return { metric: metric.name, ...metricArrayToGridArray(metric.aggregates) };
}
