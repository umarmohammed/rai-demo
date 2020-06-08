import { OverviewMetric } from './overview-metric';

export interface BootstrapResponse {
  overview: OverviewMetric[];
  instances: any[];
  columnDefs: string[];
}
