export interface Metric {
  name: string;
  value: number;
}

export function metricArrayToGridArray(metrics: Metric[]) {
  return metrics
    .map((metric) => ({ [metric.name]: metric.value }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

export function renamedMetricArrayToGridArray(metrics: Metric[], name: string) {
  return metrics
    .map((metric) => ({ [`${name}_${metric.name}`]: metric.value }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
}
