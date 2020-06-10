import { FeatureMetric } from './feature-metric';

export class PermutationResponse {
  performanceFeatures: FeatureMetric[];
  performanceMetricNames: string[];
  fairnessFeatures: FeatureMetric[];
  fairnessMetricNames: string[];
  featureScatter: FeatureScatter;
}

export type FeatureScatter = { [key: string]: { [key: string]: number } };
