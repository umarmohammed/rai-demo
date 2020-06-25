import { Component, Input } from '@angular/core';
import { Chart, blueScheme, orangeScheme } from 'src/app/core/models/chart';

@Component({
  selector: 'rai-comparison-histogram',
  template: `
    <div class="container">
      <combo-chart-component
        [results]="histogram.series"
        [lineChart]="lineChartSeries"
        [xAxis]="true"
        [yAxis]="true"
        [scheme]="blueScheme"
        [colorSchemeLine]="lineChartScheme"
        [tooltipDisabled]="true"
      >
      </combo-chart-component>
    </div>
  `,
  styleUrls: ['comparison-histogram.component.scss'],
})
export class ComparisonHistogramComponent {
  @Input() histogram: Chart;
  @Input() lineChartSeries: Chart[];
  blueScheme = blueScheme;
  lineChartScheme = orangeScheme;
}
