import { Component, Input } from '@angular/core';
import { AdversarialProbabilities } from 'src/app/core/models/attack-response';

@Component({
  selector: 'rai-adversarial-attacks-comparison-probs',
  template: `<div class="container">
      <h3 class="title">Actual Probabilities</h3>
      <ngx-charts-bar-horizontal
        [results]="probabilities.actual"
        [xScaleMax]="1"
        [xScaleMin]="0"
        [yAxis]="true"
        [trimYAxisTicks]="false"
        [showDataLabel]="true"
        [scheme]="colorScheme"
        [roundEdges]="false"
      >
      </ngx-charts-bar-horizontal>
    </div>

    <div class="container m-t-10">
      <h3 class="title">Generated Probabilities</h3>
      <ngx-charts-bar-horizontal
        [results]="probabilities.generated"
        [xScaleMax]="1"
        [xScaleMin]="0"
        [yAxis]="true"
        [trimYAxisTicks]="false"
        [showDataLabel]="true"
        [scheme]="colorScheme"
        [roundEdges]="false"
      >
      </ngx-charts-bar-horizontal>
    </div> `,
  styles: [
    `
      .container {
        height: 25%;
      }

      .title {
        text-align: center;
        font-size: 1rem;
      }

      .m-t-10 {
        padding-top: 20px;
      }
    `,
  ],
})
export class AdversarialAttacksComparisonProbsComponent {
  @Input() probabilities: AdversarialProbabilities;

  colorScheme = {
    domain: ['#1f77b4', '#ff7f0e'],
  };
}
