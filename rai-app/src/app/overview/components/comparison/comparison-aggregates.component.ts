import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AgGridEvent } from 'ag-grid-community';

@Component({
  selector: 'rai-comparison-aggregates',
  template: `
    <div [class.highlight]="highlight" class="grid-container">
      <ag-grid-angular
        class="ag-theme-alpine grid"
        [rowData]="rows"
        [columnDefs]="columnsDefs"
        rowSelection="single"
        [raiSelected]="selected"
        selectedProp="metric"
        (selectionChanged)="onSelectionChanged($event)"
      >
      </ag-grid-angular>
    </div>
  `,
  styleUrls: ['./comparison-aggregates.component.scss'],
})
export class ComparisonAggregatesComponent {
  @Input() rows: any[];
  @Input() selected: string;
  @Input() highlight: boolean;

  @Output() metricSelected = new EventEmitter<string>();

  columnsDefs = [
    {
      headerName: 'Metric',
      field: 'metric',
    },
    {
      headerName: 'Mean Model',
      field: 'model_mean',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'Mean Baseline',
      field: 'baseline_mean',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'Median Model',
      field: 'model_median',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'Median Baseline',
      field: 'baseline_median',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'CI 5% Model',
      field: 'model_q05',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'CI 5% Baseline',
      field: 'baseline_q05',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'CI 95% Model',
      field: 'model_q95',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'CI 95% Baseline',
      field: 'baseline_q95',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'Std Model',
      field: 'model_std',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'Std Baseline',
      field: 'baseline_std',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'Mad Model',
      field: 'model_mad',
      valueFormatter: this.numberFormatter,
    },
    {
      headerName: 'Mad Baseline',
      field: 'baseline_mad',
      valueFormatter: this.numberFormatter,
    },
  ];

  onSelectionChanged(event: AgGridEvent) {
    this.metricSelected.next(event.api.getSelectedNodes()[0].data.metric);
  }

  numberFormatter(params: any) {
    return params.value.toFixed(4);
  }
}
