export interface OverviewMetric {
  name: string;
  histogram: Bin[];
  aggregates: AggregateMetric[];
  type: string;
}

export interface Bin {
  interval: number;
  frequency: number;
}

export interface AggregateMetric {
  name: string;
  value: number;
}

export interface HistogramChart {
  name: string;
  series: any;
}

export const blueScheme = { domain: ['#1f77b4'] };

export function isFairnessMetric(overviewMetric: OverviewMetric) {
  return overviewMetric.type === 'fairness';
}

export function isPerformanceMetric(overviewMetric: OverviewMetric) {
  return overviewMetric.type === 'performance';
}

export function filterOverviewMetrics(
  comparator: (o: OverviewMetric) => boolean
) {
  return (overviewMetric: OverviewMetric[]) =>
    overviewMetric && overviewMetric.filter(comparator);
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
