import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as fromModel from '../../../model-state/reducers';
import { Observable } from 'rxjs';
import { OverviewMetric } from 'src/app/core/models/overview-metric';
import { Chart } from 'src/app/core/models/chart';
import { Store } from '@ngrx/store';
import {
  selectAggregatesComparisonByType,
  selectComparisonCharts,
} from 'src/app/model-state/comparison.selectors';

@Component({
  selector: 'rai-metric-comparison',
  template: `<div class="container" *ngIf="!loading">
      <h2 class="center-text">{{ title }}</h2>
      <p class="center-text">{{ (selected$ | async).name }}</p>
      <rai-comparison-histogram
        class="histogram"
        [lineChartSeries]="lineChart$ | async"
      ></rai-comparison-histogram>
      <rai-comparison-aggregates
        class="aggregates"
        (metricSelected)="metricSelected.emit($event)"
        [selected]="(selected$ | async).name"
        [rows]="items$ | async"
      ></rai-comparison-aggregates>
    </div>
    <mat-spinner class="spinner" [class.show]="loading"></mat-spinner>`,
  styleUrls: ['metric-comparison.component.scss'],
})
export class MetricComparisonComponent {
  @Input() type: string;
  @Input() title: string;
  @Input() loading: boolean;

  @Output() metricSelected: EventEmitter<string> = new EventEmitter();

  selected$: Observable<OverviewMetric>;
  lineChart$: Observable<Chart[]>;
  items$: Observable<any[]>;

  constructor(private store: Store<fromModel.State>) {}

  ngOnInit(): void {
    this.items$ = this.store.select(
      selectAggregatesComparisonByType(this.type)
    );
    this.selected$ = this.store.select(
      fromModel.selectOverviewSelectedByType(this.type)
    );
    this.lineChart$ = this.store.select(selectComparisonCharts(this.type));
  }
}
