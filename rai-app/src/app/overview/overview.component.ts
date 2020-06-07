import { Component } from '@angular/core';
import * as fromModel from '../model-state/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'rai-overview',
  template: `<rai-metric-histogram
    [histogram]="histogram$ | async"
  ></rai-metric-histogram>`,
})
export class OverviewComponent {
  histogram$ = this.store.select(fromModel.selectOverviewHistograms);

  constructor(private store: Store<fromModel.State>) {}
}
