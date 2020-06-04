import { Component } from '@angular/core';
import * as fromConnectModel from '../connect-model/store/connect-model.reducer';
import * as fromOptions from './options.reducer';
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
  features$ = this.store.select(fromConnectModel.selectConnectModelFeatures);
  featuresLoading$ = this.store.select(
    fromConnectModel.selectConnectModelLoading
  );
  gmin$ = this.store.select(fromOptions.selectOptionsGmin);
  gmaj$ = this.store.select(fromOptions.selectOptionsGmaj);

  constructor(
    private store: Store<fromConnectModel.State | fromOptions.State>
  ) {}

  onGminChanged(gmin: string) {
    this.store.dispatch(gminChanged({ gmin }));
  }

  onGmajChanged(gmaj: string) {
    this.store.dispatch(gmajChanged({ gmaj }));
  }
}
