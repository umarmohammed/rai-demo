import { Component, Input } from '@angular/core';
import { Metric } from 'src/app/core/models/metric';

@Component({
  selector: 'rai-adversarial-attacks-explanation',
  template: `<div class="flex-container">
    <ul>
      <li>Similar to instance difficulty but replace with credibility</li>
      <li>Predict Probabiliies comparison between generated and actual</li>
    </ul>
    <rai-lime-chart [explanation]="explanation"></rai-lime-chart>
  </div>`,
  styles: [
    `
      .flex-container {
        height: 100%;
        font-size: 2rem; /*temp*/
        display: flex;
      }

      rai-lime-chart {
        width: 30%;
      }
    `,
  ],
})
export class AdversarialAttacksExplanationComponent {
  @Input() explanation: Metric[];
}
