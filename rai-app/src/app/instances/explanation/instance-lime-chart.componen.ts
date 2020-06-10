import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Metric } from 'src/app/core/models/metric';

@Component({
  selector: 'rai-instance-lime-chart',
  template: `<ngx-charts-bar-horizontal
    [results]="explanation"
    [xScaleMax]="1"
    [xScaleMin]="-1"
    [xAxis]="true"
    [yAxis]="true"
    [customColors]="customColor(explanation)"
    [trimYAxisTicks]="false"
    [showDataLabel]="true"
  >
  </ngx-charts-bar-horizontal>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstanceLimeChartComponent {
  @Input() explanation: Metric[];

  customColor = (results: Metric[]) => (name: string) =>
    results.find((r) => r.name === name).value > 0 ? '#ff7f0e' : '#1f77b4';
}
