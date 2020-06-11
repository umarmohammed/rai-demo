import { Component } from '@angular/core';

import { FeatureImportanceService } from './feature-importance.service';

@Component({
  selector: 'rai-features=page',
  template: `
    <div class="container" *ngIf="!(loading$ | async)">
      <feature-importance-scatter
        class="scatter"
        [scatterChart]="scatterChart$ | async"
      ></feature-importance-scatter>
      <div class="importance-container shrink">
        <rai-feature-importance
          axis="x"
          (selectionChange)="onXAxisMetricChanged($event)"
          class="half-width"
        ></rai-feature-importance>
        <rai-feature-importance
          axis="y"
          (selectionChange)="onYAxisMetricChanged($event)"
          class="half-width"
        ></rai-feature-importance>
      </div>
    </div>
    <mat-spinner class="spinner" [class.show]="loading$ | async"></mat-spinner>
  `,
  styleUrls: ['features-page.component.scss'],
})
export class FeaturesPageComponent {
  loading$ = this.featureImportanceService.loading$;
  scatterChart$ = this.featureImportanceService.scatterChart$;

  constructor(private featureImportanceService: FeatureImportanceService) {}

  onXAxisMetricChanged(index: number) {
    this.featureImportanceService.xAxisSelectedFeatureChanged(index);
  }

  onYAxisMetricChanged(index: number) {
    this.featureImportanceService.yAxisSelectedFeatureChanged(index);
  }
}
