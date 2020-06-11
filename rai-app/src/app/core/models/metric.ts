export interface Metric {
  name: string;
  value: number;
}

export function metricArrayToGridArray(metrics: Metric[]) {
  return metrics
    .map((metric) => ({ [metric.name]: metric.value }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
}
