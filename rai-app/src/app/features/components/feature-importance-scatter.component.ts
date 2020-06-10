import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../../model-state/reducers';

@Component({
  selector: 'feature-importance-scatter',
  template: `
    <div *ngIf="!(loading$ | async)" class="scatter-container">
      <ngx-charts-bubble-chart
        [results]="(scatterChart$ | async).multi"
        [xAxis]="true"
        [yAxis]="true"
        [showXAxisLabel]="true"
        [showYAxisLabel]="true"
        [xAxisLabel]="(scatterChart$ | async).xAxisLabel"
        [yAxisLabel]="(scatterChart$ | async).yAxisLabel"
        [minRadius]="3"
        [roundDomains]="true"
      >
      </ngx-charts-bubble-chart>
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
