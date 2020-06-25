import { Component, Input } from '@angular/core';

@Component({
  selector: 'rai-adversarial-attacks-container',
  template: `<div class="container" *ngIf="!loading">
      <rai-adversarial-attacks-explanation
        class="lime-container"
      ></rai-adversarial-attacks-explanation>
      <div>Table for {{ type }}</div>
    </div>
    <!-- TODO create a wrapper component for this pattern -->
    <mat-spinner class="spinner" [class.show]="loading"></mat-spinner>`,
  styles: [
    `
      :host {
        height: 100%;
      }

      .container {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .lime-container {
        height: 35%;
      }
    `,
  ],
})
export class AdversarialAttacksContainerComponent {
  @Input() type: string;
  @Input() loading: string;
}
