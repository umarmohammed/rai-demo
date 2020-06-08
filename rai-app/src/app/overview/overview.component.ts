import { Component } from '@angular/core';
import * as fromModel from '../model-state/reducers';
import { Store } from '@ngrx/store';
import { performanceMetricSelected } from './overview.actions';

@Component({
  selector: 'rai-overview',
  template: `
    <div *ngIf="!(loading$ | async)" class="container">
      <rai-metric-histogram
        [metric]="selectedPerformanceMetric$ | async"
      ></rai-metric-histogram>
      <rai-metric-aggregates
        (metricSelected)="onPerformanceMetricSelected($event)"
        [selected]="selectedPerformanceMetric$ | async"
        [overviewMetrics]="performanceItems$ | async"
      ></rai-metric-aggregates>
    </div>
    <mat-spinner class="spinner" [class.show]="loading$ | async"></mat-spinner>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
  ],
})
export class OverviewComponent {
  selectedPerformanceMetric$ = this.store.select(
    fromModel.selectOverviewSelectedPerformance
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
