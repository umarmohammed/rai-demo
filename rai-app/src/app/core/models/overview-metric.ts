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
