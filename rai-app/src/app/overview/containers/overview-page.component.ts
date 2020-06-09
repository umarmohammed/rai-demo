import { Component } from '@angular/core';
import * as fromModel from '../../model-state/reducers';
import { Store } from '@ngrx/store';
import {
  performanceMetricSelected,
  fairnessMetricSelected,
} from '../overview.actions';
import { WindowService } from 'src/app/core/window.service';

@Component({
  selector: 'rai-overview-page',
  template: `
    <div *ngIf="!(loading$ | async)" class="container">
      <rai-metric-overview
        type="performance"
        class="performance"
        [class.half-width]="protectedFeaturesSet$ | async"
        (metricSelected)="onPerformanceMetricSelected($event)"
        title="Performance Metrics"
      ></rai-metric-overview>
      <rai-metric-overview
        *ngIf="protectedFeaturesSet$ | async"
        type="fairness"
        class="half-width"
        (metricSelected)="onFairnessMetricSelected($event)"
        title="Fairness Metrics"
      ></rai-metric-overview>
    </div>
    <mat-spinner class="spinner" [class.show]="loading$ | async"></mat-spinner>
  `,
  styleUrls: ['overview-page.component.scss'],
})
export class OverviewPageComponent {
  loading$ = this.store.select(fromModel.selectOverviewLoading);
  protectedFeaturesSet$ = this.windowService.protectedFeaturesSet$;

  constructor(
    private store: Store<fromModel.State>,
    private windowService: WindowService
  ) {}

  onPerformanceMetricSelected(selectedPerformance: string) {
    this.store.dispatch(performanceMetricSelected({ selectedPerformance }));
  }

  onFairnessMetricSelected(selectedFairness: string) {
    this.store.dispatch(fairnessMetricSelected({ selectedFairness }));
  }
}
