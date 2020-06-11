import { OverviewMetric } from './overview-metric';
import { FeatureMetric } from './feature-metric';
import { Range } from '../array-util';
import { FeatureScatter } from './permutation-response';

export interface Chart {
  name: string;
  series: Series[];
}

export interface ScatterChart {
  xAxisLabel: string;
  yAxisLabel: string;
  multi: NamedScatterSeries[];
}

export interface Series {
  name: string | number;
  value: number;
}

export interface NamedScatterSeries {
  name: string;
  series: ScatterSeries[];
}

export interface ScatterSeries {
  name: string;
  x: number;
  y: number;
  r: number;
}

export const blueScheme = { domain: ['#1f77b4'] };
export const orangeScheme = { domain: ['#ff7f0e'] };
export const grayScheme = { domain: ['#d9d9d9'] };

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

export function featureScatterToMultiSeriesChart(
  featureScatter: FeatureScatter,
  metricX: string,
  metricY: string
): ScatterChart {
  return {
    xAxisLabel: metricX,
    yAxisLabel: metricY,
    multi: [
      {
        name: 'scatter',
        series: Object.keys(featureScatter).map((feature) => ({
          x: featureScatter[feature][metricX],
          y: featureScatter[feature][metricY],
          name: feature,
          r: 1,
        })),
      },
    ],
  };
}

export function getChartMin(range: Range) {
  return range.max - 2 * (range.max - range.min);
}
