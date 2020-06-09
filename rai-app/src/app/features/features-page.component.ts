import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';
import { selectedPerformanceMetricChanged } from './feature-importance.actions';

@Component({
  selector: 'rai-features=page',
  template: `
    <div class="container">
      <rai-feature-importance
        type="performance"
        (selectionChange)="onPerformanceMetricChanged($event)"
      ></rai-feature-importance>
    </div>
  `,
  styles: [
    `
      .container {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class FeaturesPageComponent {
  constructor(private store: Store<fromModel.ModelState>) {}

  onPerformanceMetricChanged(selectedPerformanceMetric: string) {
    this.store.dispatch(
      selectedPerformanceMetricChanged({ selectedPerformanceMetric })
    );
  }
}
