import { Component, Input } from '@angular/core';
import { OverviewMetric } from '../core/models/overview-metric';

@Component({
  selector: 'rai-metric-aggregates',
  template: `<div>{{ overviewMetrics | json }}</div>`,
})
export class MetricAggregatesComponent {
  @Input() overviewMetrics: OverviewMetric[];
}
