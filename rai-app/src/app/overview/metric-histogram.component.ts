import { Component, Input } from '@angular/core';
import { HistogramChart, blueScheme } from '../core/models/overview-metric';

@Component({
  selector: 'rai-metric-histogram',
  template: `
    <div class="container">
      <h4 class="title">{{ histogram.name }}</h4>
      <ngx-charts-bar-vertical
        [results]="histogram.series"
        [xAxis]="true"
        [yAxis]="true"
        [scheme]="blueScheme"
        [barPadding]="0"
        [roundEdges]="false"
      >
      </ngx-charts-bar-vertical>
    </div>
  `,
  styleUrls: ['metric-histogram.component.scss'],
})
export class MetricHistogramComponent {
  @Input() histogram: HistogramChart;
  blueScheme = blueScheme;
}
