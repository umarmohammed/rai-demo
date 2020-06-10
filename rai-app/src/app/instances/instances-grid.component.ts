import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AgGridEvent } from 'ag-grid-community';

@Component({
  selector: 'rai-instances-grid',
  template: `
    <ag-grid-angular
      class="ag-theme-alpine grid"
      [rowData]="instances"
      [columnDefs]="columnNames"
      rowSelection="single"
      (selectionChanged)="onSelectionChanged($event)"
      [raiSelected]="selectedRowId"
    >
    </ag-grid-angular>
  `,
  styles: [
    `
      :host {
        flex: 1;
      }

      .grid {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class InstancesGridComponent {
  @Input() columnNames: string[];
  @Input() instances: any[];
  @Input() selectedRowId: number;

  @Output() selectionChanged = new EventEmitter<string>();

  onSelectionChanged(event: AgGridEvent) {
    this.selectionChanged.next(event.api.getSelectedNodes()[0].data.id);
  }
}
