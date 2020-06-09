import { OverviewMetric } from './overview-metric';

export interface BootstrapResponse {
  overview: OverviewMetric[];
  performanceInstances: any[];
  fairnessInstances: any[];
  columnDefs: string[];
}
