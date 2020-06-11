import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as fromModel from '../../model-state/reducers';
import { Store } from '@ngrx/store';
import {
  OverviewMetric,
  overviewMetricToGridArray,
} from '../../core/models/overview-metric';
import { Chart, overviewMetricToChart } from 'src/app/core/models/chart';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'rai-metric-overview',
  template: `
    <div class="container" *ngIf="!loading">
      <h2 class="center-text">{{ title }}</h2>
      <p class="center-text">{{ (selected$ | async).name }}</p>
      <rai-metric-histogram
        class="histogram"
        [histogram]="histogram$ | async"
      ></rai-metric-histogram>
      <rai-metric-aggregates
        class="aggregates"
        (metricSelected)="metricSelected.emit($event)"
        [selected]="(selected$ | async).name"
        [rows]="items$ | async"
        [highlight]="type === 'fairness'"
      ></rai-metric-aggregates>
    </div>
    <mat-spinner class="spinner" [class.show]="loading"></mat-spinner>
  `,
  styleUrls: ['metric-overview.component.scss'],
})
export class MetricOverviewComponent implements OnInit {
  @Input() type: string;
  @Input() title: string;
  @Input() loading: boolean;

  @Output() metricSelected: EventEmitter<string> = new EventEmitter();

  selected$: Observable<OverviewMetric>;
  histogram$: Observable<Chart>;
  items$: Observable<any[]>;

  constructor(private store: Store<fromModel.State>) {}

  ngOnInit(): void {
    this.items$ = this.store
      .select(fromModel.selectOverviewItemsByType(this.type))
      .pipe(map((items) => items.map(overviewMetricToGridArray)));
    this.selected$ = this.store.select(
      fromModel.selectOverviewSelectedByType(this.type)
    );
    this.histogram$ = this.selected$.pipe(map(overviewMetricToChart));
  }
}
