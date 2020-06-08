import { Component } from '@angular/core';
import * as fromModel from '../model-state/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'rai-overview',
  template: `
    <div *ngIf="!(loading$ | async)" class="container">
      <rai-metric-histogram
        [histogram]="performanceMetricHistogram$ | async"
      ></rai-metric-histogram>
      <rai-metric-aggregates
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
  performanceMetricHistogram$ = this.store.select(
    fromModel.selectHistogram(fromModel.selectOverviewSelectedPerformance)
  );
  loading$ = this.store.select(fromModel.selectOverviewLoading);
  performanceItems$ = this.store.select(
    fromModel.selectOverviewPerformanceItems
  );

  constructor(private store: Store<fromModel.State>) {}
}
