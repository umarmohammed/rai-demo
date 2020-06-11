import { Component, Input } from '@angular/core';
import { Chart, blueScheme } from 'src/app/core/models/chart';

@Component({
  selector: 'rai-metric-histogram',
  template: `
    <div class="container">
      <ngx-charts-bar-vertical
        [results]="histogram.series"
        [xAxis]="true"
        [yAxis]="true"
        [scheme]="blueScheme"
        [barPadding]="1"
        [roundEdges]="false"
      >
      </ngx-charts-bar-vertical>
    </div>
  `,
  styleUrls: ['metric-histogram.component.scss'],
})
export class MetricHistogramComponent {
  @Input() histogram: Chart;
  blueScheme = blueScheme;
}
