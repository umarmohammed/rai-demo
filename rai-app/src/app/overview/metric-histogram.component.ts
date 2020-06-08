import { Component, Input } from '@angular/core';
import { HistogramChart, blueScheme } from '../core/models/overview-metric';

@Component({
  selector: 'rai-metric-histogram',
  template: `
    <div style="width:100%; height: 100%">
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
})
export class MetricHistogramComponent {
  @Input() histogram: HistogramChart;
  blueScheme = blueScheme;
}
