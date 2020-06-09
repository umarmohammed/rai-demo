import { OverviewMetric } from './overview-metric';
import { FeatureMetric } from './feature-metric';

export interface Chart {
  name: string;
  series: any;
}

export const blueScheme = { domain: ['#1f77b4'] };
export const orangeScheme = { domain: ['#ff7f0e'] };

// TODO: featureMetricToChart and overviewMetricToChart should be a single function
export function featureMetricToChart(metric: FeatureMetric): Chart {
  return {
    name: metric.name,
    series: metric.features.map((feature) => ({
      name: feature.name,
      value: feature.value,
    })),
  };
}

export function overviewMetricToChart(metric: OverviewMetric): Chart {
  return {
    name: metric.name,
    series: metric.histogram.map((bin) => ({
      name: bin.interval,
      value: bin.frequency,
    })),
  };
}
