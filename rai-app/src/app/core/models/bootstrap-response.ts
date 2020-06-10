import { OverviewMetric } from './overview-metric';
import { Instance } from './instance';

export interface BootstrapResponse {
  overview: OverviewMetric[];
  performanceItems: Instance[];
  fairnessItems: Instance[];
  columnNames: string[];
}
