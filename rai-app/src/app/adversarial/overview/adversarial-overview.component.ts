import { Component } from '@angular/core';

@Component({
  selector: 'rai-adversarial-overview',
  template: `<div style="font-size: 2rem; padding: 10px;">
    <ul>
      <li>Overview tables and charts</li>
      <li>
        Compare overview metrics before and after adversarial attacks (see
        baseline comparison)
      </li>
      <li>Add setup for Adversarial attacks</li>
    </ul>
  </div>`,
})
export class AdversarialOverviewComponent {}
