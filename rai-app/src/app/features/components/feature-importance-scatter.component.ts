import { Component, Input } from '@angular/core';
import { ScatterChart } from 'src/app/core/models/chart';

@Component({
  selector: 'feature-importance-scatter',
  template: `
    <div class="scatter-container">
      <ngx-charts-bubble-chart
        [results]="scatterChart.multi"
        [xAxis]="true"
        [yAxis]="true"
        [showXAxisLabel]="true"
        [showYAxisLabel]="true"
        [xAxisLabel]="scatterChart.xAxisLabel"
        [yAxisLabel]="scatterChart.yAxisLabel"
        [minRadius]="3"
        [roundDomains]="true"
      >
      </ngx-charts-bubble-chart>
    </div>
  `,
  styles: [
    `
      .scatter-container {
        height: 100%;
      }
    `,
  ],
})
export class FeatureImportanceScatterComponent {
  @Input() scatterChart: ScatterChart;
}
