import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Metric } from 'src/app/core/models/metric';
import { grayScheme, orangeScheme } from 'src/app/core/models/chart';

@Component({
  selector: 'rai-adversarial-attacks-credibilities',
  template: ` <div class="container">
    <h3 style="text-align:center;font-size: 1.3rem">Credibility</h3>
    <div class="chart-container">
      <ngx-charts-bar-horizontal
        [results]="credibilities"
        [xScaleMax]="1"
        [xScaleMin]="0"
        [trimYAxisTicks]="false"
        [showDataLabel]="true"
        [scheme]="grayScheme"
        [customColors]="getCustomColor(selectedId)"
      >
      </ngx-charts-bar-horizontal>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .chart-container {
        height: calc(100% - 70px);
      }
    `,
  ],
})
export class AdversarialAttacksCredibilitiesComponent {
  @Input() credibilities: Metric[];
  @Input() selectedId: string;

  grayScheme = grayScheme;

  getCustomColor(selectedId: string) {
    return (name: string) =>
      selectedId === name ? orangeScheme.domain : grayScheme.domain;
  }
}
