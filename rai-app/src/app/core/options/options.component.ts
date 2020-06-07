import { Component } from '@angular/core';
import * as fromModel from '../../model-state/reducers';
import { Store } from '@ngrx/store';
import { gminChanged, gmajChanged } from './options.actions';

@Component({
  selector: 'rai-options',
  template: `
    <div [class.hidden]="featuresLoading$ | async">
      <div class="container">
        <p class="header">Protected Features</p>

        <rai-select-protected-feaure
          [features]="features$ | async"
          label="Unpriveleged Group"
          (selectionChange)="onGminChanged($event)"
        ></rai-select-protected-feaure>
        <rai-select-protected-feaure
          [features]="features$ | async"
          label="Priveleged Group"
          (selectionChange)="onGmajChanged($event)"
        ></rai-select-protected-feaure>
      </div>
    </div>
    <mat-spinner
      class="spinner"
      [class.show]="featuresLoading$ | async"
    ></mat-spinner>
  `,
  styleUrls: ['options.component.scss'],
})
export class OptionsComponent {
  features$ = this.store.select(fromModel.selectAllFeatures);
  featuresLoading$ = this.store.select(fromModel.selectFeaturesLoading);
  gmin$ = this.store.select(fromModel.selectGmin);
  gmaj$ = this.store.select(fromModel.selectGmaj);

  constructor(private store: Store<fromModel.State>) {}

  onGminChanged(gmin: string) {
    this.store.dispatch(gminChanged({ gmin }));
  }

  onGmajChanged(gmaj: string) {
    this.store.dispatch(gmajChanged({ gmaj }));
  }
}
