import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Metric } from 'src/app/core/models/metric';

@Component({
  selector: 'rai-lime-chart',
  template: `<ngx-charts-bar-horizontal
    [results]="explanation"
    [yAxis]="true"
    [customColors]="customColor(explanation)"
    [trimYAxisTicks]="false"
    [showDataLabel]="true"
    [roundEdges]="false"
  >
  </ngx-charts-bar-horizontal>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimeChartComponent {
  @Input() explanation: Metric[];

  customColor = (results: Metric[]) => (name: string) =>
    results.find((r) => r.name === name).value > 0 ? '#ff7f0e' : '#1f77b4';
}
