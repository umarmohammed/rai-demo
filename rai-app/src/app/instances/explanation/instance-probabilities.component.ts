import { Component, Input } from '@angular/core';
import { Metric } from 'src/app/core/models/metric';

@Component({
  selector: 'rai-instance-probabilities',
  template: `<div class="container">
    <h3 class="title">Prediction Probabilities</h3>
    <ngx-charts-bar-horizontal
      [results]="probabilities"
      [xScaleMax]="1"
      [xScaleMin]="0"
      [yAxis]="true"
      [trimYAxisTicks]="false"
      [showDataLabel]="true"
      [scheme]="colorScheme"
      [roundEdges]="false"
    >
    </ngx-charts-bar-horizontal>
  </div>`,
  styles: [
    `
      .container {
        height: 50%;
      }

      .title {
        text-align: center;
      }
    `,
  ],
})
export class InstanceProbabilitiesComponent {
  @Input() probabilities: Metric[];

  colorScheme = {
    domain: ['#1f77b4', '#ff7f0e'],
  };
}
