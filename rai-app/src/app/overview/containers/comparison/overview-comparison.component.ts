import { Component } from '@angular/core';
import * as fromModel from '../../../model-state/reducers';
import { Store } from '@ngrx/store';
import { WindowService } from 'src/app/core/window.service';
import {
  performanceMetricSelected,
  fairnessMetricSelected,
} from '../../overview.actions';

@Component({
  selector: 'rai-overview-comparison',
  template: ` <div class="container">
    <rai-metric-comparison
      type="performance"
      class="performance"
      [class.half-width]="protectedFeaturesSet$ | async"
      (metricSelected)="onPerformanceMetricSelected($event)"
      title="Performance Metrics"
      [loading]="loading$ | async"
    ></rai-metric-comparison>
    <rai-metric-comparison
      *ngIf="protectedFeaturesSet$ | async"
      type="fairness"
      class="half-width"
      (metricSelected)="onFairnessMetricSelected($event)"
      title="Fairness Metrics"
      [loading]="fairnessLoading$ | async"
    ></rai-metric-comparison>
  </div>`,
  styleUrls: ['overview-comparison.component.scss'],
})
export class OverviewComparisonComponent {
  loading$ = this.store.select(
    fromModel.selectBaselineLoadingByType('performance')
  );
  fairnessLoading$ = this.store.select(
    fromModel.selectBaselineLoadingByType('fairness')
  );
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
