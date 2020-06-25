import { Component } from '@angular/core';

@Component({
  selector: 'rai-adversarial-attacks-explanation',
  template: `<div class="flex-container">
    <ul>
      <li>Similar to instance difficulty but replace with credibility</li>
      <li>LIME explanation</li>
      <li>Predict Probabiliies comparison between generated and actual</li>
    </ul>
  </div>`,
  styles: [
    `
      .flex-container {
        height: 100%;
        font-size: 2rem; /*temp*/
      }
    `,
  ],
})
export class AdversarialAttacksExplanationComponent {}
