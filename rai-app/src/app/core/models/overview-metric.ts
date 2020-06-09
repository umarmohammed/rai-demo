import { Metric } from './metric';

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

export interface HistogramChart {
  name: string;
  series: any;
}

export const blueScheme = { domain: ['#1f77b4'] };

export function filterOverviewMetricsByType(type: string) {
  return (overviewMetric: OverviewMetric[]) =>
    overviewMetric && overviewMetric.filter((o) => o.type == type);
}

export function overviewMetricToHistogramChart(
  metric: OverviewMetric
): HistogramChart {
  return {
    name: metric.name,
    series: metric.histogram.map((bin) => ({
      name: bin.interval,
      value: bin.frequency,
    })),
  };
}
