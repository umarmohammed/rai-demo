import { Component } from '@angular/core';
import * as fromModel from '../model-state/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'rai-overview',
  template: `
    <div [class.hidden]="loading$ | async">
      <rai-metric-histogram
        [histogram]="histogram$ | async"
      ></rai-metric-histogram>
    </div>
    <mat-spinner class="spinner" [class.show]="loading$ | async"></mat-spinner>
  `,
})
export class OverviewComponent {
  histogram$ = this.store.select(fromModel.selectOverviewHistograms);
  loading$ = this.store.select(fromModel.selectOverviewLoading);

  constructor(private store: Store<fromModel.State>) {}
}
