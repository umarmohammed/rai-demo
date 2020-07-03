import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AgGridEvent } from 'ag-grid-community';
import { gridNumberFormatter } from 'src/app/shared/number-utils';

@Component({
  selector: 'rai-metric-aggregates',
  template: `
    <div [class.highlight]="highlight" class="grid-container">
      <ag-grid-angular
        class="ag-theme-alpine grid"
        [rowData]="rows"
        [columnDefs]="columnsDefs"
        rowSelection="single"
        (gridSizeChanged)="onGridSizeChanged($event)"
        [raiSelected]="selected"
        selectedProp="metric"
        (selectionChanged)="onSelectionChanged($event)"
        [rowClassRules]="rowClassRules"
      >
      </ag-grid-angular>
    </div>
  `,
  styleUrls: ['./metric-aggregates.component.scss'],
})
export class MetricAggregatesComponent {
  @Input() rows: any[];
  @Input() selected: string;
  @Input() highlight: boolean;

  @Output() metricSelected = new EventEmitter<string>();

  columnsDefs = [
    {
      headerName: 'Metric',
      field: 'metric',
    },
    { headerName: 'Mean', field: 'mean', valueFormatter: gridNumberFormatter },
    {
      headerName: 'Median',
      field: 'median',
      valueFormatter: gridNumberFormatter,
    },
    { headerName: 'CI 5%', field: 'q05', valueFormatter: gridNumberFormatter },
    {
      headerName: 'CI 95%',
      field: 'q95',
      valueFormatter: gridNumberFormatter,
    },
    { headerName: 'Std', field: 'std', valueFormatter: gridNumberFormatter },
    { headerName: 'Mad', field: 'mad', valueFormatter: gridNumberFormatter },
  ];

  rowClassRules = {
    'fair-aggregate': (params) => params.data.isFair,
    'unfair-aggregate': (params) => !params.data.isFair,
  };

  onGridSizeChanged(params: AgGridEvent) {
    params.api.sizeColumnsToFit();
  }

  onSelectionChanged(event: AgGridEvent) {
    this.metricSelected.next(event.api.getSelectedNodes()[0].data.metric);
  }
}
