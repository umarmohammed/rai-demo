import { Component, Input } from '@angular/core';
import { OverviewMetric, Bin } from '../core/models/overview-metric';

@Component({
  selector: 'rai-metric-histogram',
  template: `<div>{{ metric && metric.histogram | json }}</div>`,
})
export class MetricHistogramComponent {
  @Input() metric: OverviewMetric;
}
