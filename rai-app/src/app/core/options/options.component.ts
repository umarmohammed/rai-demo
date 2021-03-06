import { Component } from '@angular/core';
import * as fromModel from '../../model-state/reducers';
import { Store } from '@ngrx/store';
import { protectedFeatureChanged } from './options.actions';

@Component({
  selector: 'rai-options',
  template: `
    <div [class.hidden]="featuresLoading$ | async">
      <div class="container">
        <p class="header">Protected Features</p>

        <rai-select-protected-feaure
          [value]="gmin$ | async"
          [features]="features$ | async"
          label="Unpriveleged Group"
          (selectionChange)="onGminChanged($event, selectGmaj.value)"
          #selectGmin
        ></rai-select-protected-feaure>
        <rai-select-protected-feaure
          [value]="gmaj$ | async"
          [features]="features$ | async"
          label="Priveleged Group"
          (selectionChange)="onGmajChanged($event, selectGmin.value)"
          #selectGmaj
        ></rai-select-protected-feaure>
        <mat-spinner
          class="spinner"
          [class.show]="somethingLoading$ | async"
          [diameter]="30"
        ></mat-spinner>
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
  somethingLoading$ = this.store.select(
    fromModel.selectSomethingLoadingOnFeaturesSet
  );

  constructor(private store: Store<fromModel.State>) {}

  onGminChanged(gmin: string, gmaj: string) {
    this.store.dispatch(protectedFeatureChanged({ gmin, gmaj }));
  }

  onGmajChanged(gmaj: string, gmin: string) {
    this.store.dispatch(protectedFeatureChanged({ gmin, gmaj }));
  }
}
