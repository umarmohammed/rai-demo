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
