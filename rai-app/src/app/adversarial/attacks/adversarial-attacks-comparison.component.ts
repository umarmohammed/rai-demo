import { Component, Input } from '@angular/core';
import { Adversarial } from 'src/app/core/models/attack-response';

@Component({
  selector: 'rai-adversarial-attacks-comparison',
  template: `<div>{{ adversarial | json }}</div>`,
})
export class AdversarialAttacksComparisonComponent {
  @Input() adversarial: Adversarial;
}
