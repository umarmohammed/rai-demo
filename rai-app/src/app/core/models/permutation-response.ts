import { FeatureMetric } from './feature-metric';

export class PermutationResponse {
  performanceFeatures: FeatureMetric[];
  performanceMetricNames: string[];
  fairnessFeatures: FeatureMetric[];
  fairnessMetricNames: string[];
}
