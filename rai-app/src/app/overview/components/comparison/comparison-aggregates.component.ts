import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AgGridEvent } from 'ag-grid-community';
import { gridNumberFormatter } from 'src/app/shared/number-utils';

@Component({
  selector: 'rai-comparison-aggregates',
  template: `
    <div class="highlight grid-container">
      <ag-grid-angular
        class="ag-theme-alpine grid"
        [rowData]="rows"
        [columnDefs]="columnsDefs"
        rowSelection="single"
        [raiSelected]="selected"
        selectedProp="metric"
        (selectionChanged)="onSelectionChanged($event)"
        [rowClassRules]="rowClassRules"
      >
      </ag-grid-angular>
    </div>
  `,
  styleUrls: ['./comparison-aggregates.component.scss'],
})
export class ComparisonAggregatesComponent {
  @Input() rows: any[];
  @Input() selected: string;

  @Output() metricSelected = new EventEmitter<string>();

  columnsDefs = [
    {
      headerName: 'Metric',
      field: 'metric',
    },
    {
      headerName: 'Mean Model',
      field: 'model_mean',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'Mean Baseline',
      field: 'baseline_mean',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'Median Model',
      field: 'model_median',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'Median Baseline',
      field: 'baseline_median',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'CI 5% Model',
      field: 'model_q05',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'CI 5% Baseline',
      field: 'baseline_q05',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'CI 95% Model',
      field: 'model_q95',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'CI 95% Baseline',
      field: 'baseline_q95',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'Std Model',
      field: 'model_std',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'Std Baseline',
      field: 'baseline_std',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'Mad Model',
      field: 'model_mad',
      valueFormatter: gridNumberFormatter,
    },
    {
      headerName: 'Mad Baseline',
      field: 'baseline_mad',
      valueFormatter: gridNumberFormatter,
    },
  ];

  rowClassRules = {
    'fair-aggregate': (params) => params.data.isGood,
    'unfair-aggregate': (params) => !params.data.isGood,
  };

  onSelectionChanged(event: AgGridEvent) {
    this.metricSelected.next(event.api.getSelectedNodes()[0].data.metric);
  }
}
