import { Component, Input } from '@angular/core';
import { Metric } from 'src/app/core/models/metric';
import { AdversarialProbabilities } from 'src/app/core/models/attack-response';

@Component({
  selector: 'rai-adversarial-attacks-explanation',
  template: `<div class="flex-container">
    <rai-adversarial-attacks-credibilities
      [credibilities]="credibilities"
      [selectedId]="selectedId"
    >
    </rai-adversarial-attacks-credibilities>

    <rai-adversarial-attacks-comparison-probs
      [probabilities]="probabilities"
    ></rai-adversarial-attacks-comparison-probs>

    <rai-lime-chart [explanation]="explanation"></rai-lime-chart>
  </div>`,
  styles: [
    `
      .flex-container {
        height: 100%;
        font-size: 2rem; /*temp*/
        display: flex;
      }

      rai-adversarial-attacks-credibilities {
        width: 30%;
      }

      rai-adversarial-attacks-comparison-probs {
        width: 30%;
      }

      rai-lime-chart {
        width: 30%;
      }
    `,
  ],
})
export class AdversarialAttacksExplanationComponent {
  @Input() explanation: Metric[];
  @Input() probabilities: AdversarialProbabilities;
  @Input() credibilities: Metric[];
  @Input() selectedId: number;
}
