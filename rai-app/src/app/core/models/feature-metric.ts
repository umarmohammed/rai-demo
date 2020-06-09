import { Metric } from './metric';

export interface FeatureMetric {
  name: string;
  features: Metric[];
}
