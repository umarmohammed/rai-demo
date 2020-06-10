import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';
import {
  selectedPerformanceMetricChanged,
  selectedFairnessMetricChanged,
} from './feature-importance.actions';
import { WindowService } from '../core/window.service';

@Component({
  selector: 'rai-features=page',
  template: `
    <div class="container">
      <feature-importance-scatter
        class="scatter"
        *ngIf="protectedFeaturesSet$ | async"
      ></feature-importance-scatter>
      <div
        class="importance-container"
        [class.shrink]="protectedFeaturesSet$ | async"
      >
        <rai-feature-importance
          type="performance"
          (selectionChange)="onPerformanceMetricChanged($event)"
          [class.half-width]="protectedFeaturesSet$ | async"
        ></rai-feature-importance>
        <rai-feature-importance
          type="fairness"
          (selectionChange)="onFairnessMetricChanged($event)"
          class="half-width"
          *ngIf="protectedFeaturesSet$ | async"
        ></rai-feature-importance>
      </div>
    </div>
  `,
  styleUrls: ['features-page.component.scss'],
})
export class FeaturesPageComponent {
  protectedFeaturesSet$ = this.windowService.protectedFeaturesSet$;

  constructor(
    private store: Store<fromModel.State>,
    private windowService: WindowService
  ) {}

  onPerformanceMetricChanged(selectedPerformanceMetric: string) {
    this.store.dispatch(
      selectedPerformanceMetricChanged({ selectedPerformanceMetric })
    );
  }

  onFairnessMetricChanged(selectedFairnessMetric: string) {
    this.store.dispatch(
      selectedFairnessMetricChanged({ selectedFairnessMetric })
    );
  }
}
