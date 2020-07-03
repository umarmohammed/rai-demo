import { Component, Input } from '@angular/core';
import { gridNumberFormatter } from 'src/app/shared/number-utils';

@Component({
  selector: 'rai-adversarial-attacks-comparison',
  template: `<ag-grid-angular
    class="ag-theme-alpine grid"
    [rowData]="items"
    rowSelection="single"
    [columnDefs]="columnDefs"
  >
  </ag-grid-angular>`,
  styles: [
    `
      .grid {
        height: 100%;
      }
    `,
  ],
})
export class AdversarialAttacksComparisonComponent {
  @Input() items: any[];

  columnDefs = [
    { headerName: 'Feature', field: 'feature', flex: 1 },
    {
      headerName: 'Actual',
      field: 'actual',
      width: 100,
    },
    {
      headerName: 'Generated',
      field: 'generated',
      width: 100,
      valueFormatter: gridNumberFormatter,
    },
  ];
}
