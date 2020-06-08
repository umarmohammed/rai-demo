import { Component } from '@angular/core';
import * as fromModel from '../model-state/reducers';
import { Store } from '@ngrx/store';
import { performanceMetricSelected } from './overview.actions';

@Component({
  selector: 'rai-overview',
  template: `
    <div *ngIf="!(loading$ | async)" class="container">
      <rai-metric-histogram
        class="histogram"
        [histogram]="selectPerformanceHistogram$ | async"
      ></rai-metric-histogram>
      <rai-metric-aggregates
        class="aggregates"
        (metricSelected)="onPerformanceMetricSelected($event)"
        [selected]="selectedPerformanceMetric$ | async"
        [overviewMetrics]="performanceItems$ | async"
      ></rai-metric-aggregates>
    </div>
    <mat-spinner class="spinner" [class.show]="loading$ | async"></mat-spinner>
  `,
  styleUrls: ['overview.component.scss'],
})
export class OverviewComponent {
  selectedPerformanceMetric$ = this.store.select(
    fromModel.selectOverviewSelectedPerformance
  );

  selectPerformanceHistogram$ = this.store.select(
    fromModel.selectHistogram(fromModel.selectOverviewSelectedPerformance)
  );

  loading$ = this.store.select(fromModel.selectOverviewLoading);
  performanceItems$ = this.store.select(
    fromModel.selectOverviewPerformanceItems
  );

  constructor(private store: Store<fromModel.State>) {}

  onPerformanceMetricSelected(selectedPerformance: string) {
    this.store.dispatch(performanceMetricSelected({ selectedPerformance }));
  }
}
