import { Component } from '@angular/core';
import * as fromConnectModel from '../connect-model/store/connect-model.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'rai-options',
  template: `
    <div [class.hidden]="featuresLoading$ | async">
      <div class="container">
        <p class="header">Protected Features</p>

        <rai-select-protected-feaure
          [features]="features$ | async"
          label="Unpriveleged Group"
        ></rai-select-protected-feaure>
        <rai-select-protected-feaure
          [features]="features$ | async"
          label="Priveleged Group"
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

  constructor(private store: Store<fromConnectModel.State>) {}
}
