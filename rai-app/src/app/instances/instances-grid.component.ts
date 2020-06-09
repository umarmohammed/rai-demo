import { Component, Input } from '@angular/core';

@Component({
  selector: 'rai-instances-grid',
  template: `
    <ag-grid-angular
      class="ag-theme-alpine grid"
      [rowData]="instances"
      [columnDefs]="columnNames"
      rowSelection="single"
    >
    </ag-grid-angular>
  `,
  styles: [
    `
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
}
