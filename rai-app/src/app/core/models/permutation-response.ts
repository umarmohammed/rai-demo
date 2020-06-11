import { FeatureMetric } from './feature-metric';

export class PermutationResponse {
  features: FeatureMetric[];
  metricNames: string[];
  featureScatter: FeatureScatter;
}

export type FeatureScatter = { [key: string]: { [key: string]: number } };
