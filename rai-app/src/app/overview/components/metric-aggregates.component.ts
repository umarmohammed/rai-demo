import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AgGridEvent } from 'ag-grid-community';

@Component({
  selector: 'rai-metric-aggregates',
  template: `
    <ag-grid-angular
      class="ag-theme-alpine grid"
      [rowData]="rows"
      [columnDefs]="columnsDefs"
      rowSelection="single"
      (gridSizeChanged)="onGridSizeChanged($event)"
      [raiSelected]="selected"
      selectedProp="metric"
      (selectionChanged)="onSelectionChanged($event)"
    >
    </ag-grid-angular>
  `,
  styleUrls: ['./metric-aggregates.component.scss'],
})
export class MetricAggregatesComponent {
  @Input() rows: any[];
  @Input() selected: string;

  @Output() metricSelected = new EventEmitter<string>();

  columnsDefs = [
    { headerName: 'Metric', field: 'metric' },
    { headerName: 'Mean', field: 'mean' },
    { headerName: 'Median', field: 'median' },
    { headerName: 'CI 5%', field: 'q05' },
    { headerName: 'CI 95%', field: 'q95' },
    { headerName: 'Std', field: 'std' },
    { headerName: 'Mad', field: 'mad' },
  ];

  onGridSizeChanged(params: AgGridEvent) {
    params.api.sizeColumnsToFit();
  }

  onSelectionChanged(event: AgGridEvent) {
    this.metricSelected.next(event.api.getSelectedNodes()[0].data.metric);
  }
}
