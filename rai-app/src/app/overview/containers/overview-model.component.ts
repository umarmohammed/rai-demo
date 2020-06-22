import { Component } from '@angular/core';
import * as fromModel from '../../model-state/reducers';
import { Store } from '@ngrx/store';
import { WindowService } from 'src/app/core/window.service';
import {
  performanceMetricSelected,
  fairnessMetricSelected,
} from '../overview.actions';

@Component({
  selector: 'rai-overview-model',
  template: `
    <div class="container">
      <rai-metric-overview
        type="performance"
        class="performance"
        [class.half-width]="protectedFeaturesSet$ | async"
        (metricSelected)="onPerformanceMetricSelected($event)"
        title="Performance Metrics"
        [loading]="loading$ | async"
      ></rai-metric-overview>
      <rai-metric-overview
        *ngIf="protectedFeaturesSet$ | async"
        type="fairness"
        class="half-width"
        (metricSelected)="onFairnessMetricSelected($event)"
        title="Fairness Metrics"
        [loading]="fairnessLoading$ | async"
      ></rai-metric-overview>
    </div>
  `,
  styleUrls: ['overview-model.component.scss'],
})
export class OverviewModelComponent {
  loading$ = this.store.select(
    fromModel.selectOverviewLoadingByType('performance')
  );
  fairnessLoading$ = this.store.select(
    fromModel.selectOverviewLoadingByType('fairness')
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
