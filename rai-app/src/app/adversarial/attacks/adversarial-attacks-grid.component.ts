import { Component, Input } from '@angular/core';
import { Adversarials } from 'src/app/core/models/attack-response';

@Component({
  selector: 'rai-adversarial-attacks-grid',
  template: `<div class="grid-container">
    <ag-grid-angular
      class="ag-theme-alpine grid"
      [rowData]="adversarials.generatedInstances"
      [columnDefs]="columnNames"
      rowSelection="single"
    >
    </ag-grid-angular>
    <rai-adversarial-attacks-comparison> </rai-adversarial-attacks-comparison>
  </div>`,
  styles: [
    `
      :host {
        flex: 1;
      }

      .grid {
        width: 50%;
        height: 100%;
      }
      .grid-container {
        height: 100%;
        display: flex;
      }
    `,
  ],
})
export class AdversarialAttacksGridComponent {
  @Input() columnNames: string[];
  @Input() adversarials: Adversarials;
}
