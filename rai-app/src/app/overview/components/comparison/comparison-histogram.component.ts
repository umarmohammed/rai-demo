import { Component, Input } from '@angular/core';
import { Chart, blueScheme, orangeScheme } from 'src/app/core/models/chart';
import { curveMonotoneX } from 'd3-shape';

@Component({
  selector: 'rai-comparison-histogram',
  template: `
    <div class="container">
      <ngx-charts-area-chart
        [xAxis]="true"
        [yAxis]="true"
        [results]="lineChartSeries"
        [scheme]="lineChartScheme"
        [legend]="true"
        [curve]="curve"
        
      >
      </ngx-charts-area-chart>
    </div>
  `,
  styleUrls: ['comparison-histogram.component.scss'],
})
export class ComparisonHistogramComponent {
  @Input() baselineSeries: Chart[];
  @Input() lineChartSeries: Chart[];
  curve = curveMonotoneX;
  lineChartScheme = { domain: [blueScheme.domain[0], orangeScheme.domain[0]] };
}
