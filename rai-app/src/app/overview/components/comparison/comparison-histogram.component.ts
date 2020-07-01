import { Component, Input } from '@angular/core';
import { Chart, blueScheme, orangeScheme } from 'src/app/core/models/chart';

@Component({
  selector: 'rai-comparison-histogram',
  template: `
    <div class="container">
      <ngx-charts-line-chart
        [xAxis]="true"
        [yAxis]="true"
        [results]="lineChartSeries"
        [scheme]="lineChartScheme"
        [legend]="true"
      >
      </ngx-charts-line-chart>
    </div>
  `,
  styleUrls: ['comparison-histogram.component.scss'],
})
export class ComparisonHistogramComponent {
  @Input() baselineSeries: Chart[];
  @Input() lineChartSeries: Chart[];
  lineChartScheme = { domain: [blueScheme.domain[0], orangeScheme.domain[0]] };
}
