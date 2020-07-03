import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Adversarials, Adversarial } from 'src/app/core/models/attack-response';
import { AgGridEvent } from 'ag-grid-community';

@Component({
  selector: 'rai-adversarial-attacks-grid',
  template: `<div class="grid-container">
    <ag-grid-angular
      class="ag-theme-alpine grid"
      [rowData]="adversarials.generatedInstances"
      [columnDefs]="columnNames"
      rowSelection="single"
      [raiSelected]="selectedRowId"
      (selectionChanged)="onSelectionChanged($event)"
    >
    </ag-grid-angular>
    <rai-adversarial-attacks-comparison
      class="comparison"
      [adversarial]="selectedAdversarial"
    >
    </rai-adversarial-attacks-comparison>
  </div>`,
  styles: [
    `
      :host {
        flex: 1;
      }

      .grid {
        flex: 1;
        height: 100%;
      }
      .grid-container {
        height: 100%;
        display: flex;
      }

      .comparison {
        width: 200px;
      }
    `,
  ],
})
export class AdversarialAttacksGridComponent {
  @Input() columnNames: string[];
  @Input() adversarials: Adversarials;
  @Input() selectedRowId: number;
  @Input() selectedAdversarial: Adversarial;

  @Output() selectionChanged = new EventEmitter<string>();

  onSelectionChanged(event: AgGridEvent) {
    this.selectionChanged.next(event.api.getSelectedNodes()[0].data.id);
  }
}
