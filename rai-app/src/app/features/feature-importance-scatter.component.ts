import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';

@Component({
  selector: 'feature-importance-scatter',
  template: `
    <div *ngIf="!(loading$ | async)" class="scatter-container">
      <div style="overflow: hidden; height: 100%">
        {{ scatterChart$ | async | json }}
      </div>
    </div>
  `,
  styles: [
    `
      .scatter-container {
        height: 100%;
      }
    `,
  ],
})
export class FeatureImportanceScatterComponent {
  loading$ = this.store.select(
    fromModel.selectFeatureImportanceLoadingByType('fairness')
  );
  scatterChart$ = this.store.select(fromModel.selectFeatureScatterChart);

  constructor(private store: Store) {}
}
