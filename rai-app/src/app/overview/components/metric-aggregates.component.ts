import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AgGridEvent } from 'ag-grid-community';

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
    { headerName: 'Mean', field: 'mean', valueFormatter: this.numberFormatter },
    {
      headerName: 'Median',
      field: 'median',
      valueFormatter: this.numberFormatter,
    },
    { headerName: 'CI 5%', field: 'q05', valueFormatter: this.numberFormatter },
    {
      headerName: 'CI 95%',
      field: 'q95',
      valueFormatter: this.numberFormatter,
    },
    { headerName: 'Std', field: 'std', valueFormatter: this.numberFormatter },
    { headerName: 'Mad', field: 'mad', valueFormatter: this.numberFormatter },
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

  numberFormatter(params: any) {
    return params.value.toFixed(4);
  }
}
