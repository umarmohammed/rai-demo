import { Component } from '@angular/core';
import * as fromModel from '../model-state/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'rai-overview-page',
  template: `
    <div *ngIf="!(loading$ | async)">
      <rai-metric-overview type="performance"></rai-metric-overview>
    </div>
    <mat-spinner class="spinner" [class.show]="loading$ | async"></mat-spinner>
  `,
  styles: [
    `
      div {
        height: 100%;
      }
    `,
  ],
})
export class OverviewPageComponent {
  loading$ = this.store.select(fromModel.selectOverviewLoading);

  constructor(private store: Store<fromModel.State>) {}
}
