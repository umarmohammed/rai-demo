import { Component, Input } from '@angular/core';
import { OverviewMetric } from '../core/models/overview-metric';

@Component({
  selector: 'rai-metric-aggregates',
  template: `<table>
    <tr>
      <th>Metric</th>
      <th>Mean</th>
      <th>Median</th>
      <th>CI 5%</th>
      <th>CI 95%</th>
      <th>Std</th>
      <th>Mad</th>
    </tr>
    <tr
      *ngFor="let metric of overviewMetrics"
      class="data-row"
      [class.selected-row]="metric.name === selected.name"
    >
      <td>{{ metric.name }}</td>
      <td *ngFor="let aggregate of metric.aggregates">
        {{ aggregate.value | number: '1.1-6' }}
      </td>
    </tr>
  </table>`,
  styleUrls: ['./metric-aggregates.component.scss'],
})
export class MetricAggregatesComponent {
  @Input() overviewMetrics: OverviewMetric[];
  @Input() headings: string[];
  @Input() selected: OverviewMetric;
}
