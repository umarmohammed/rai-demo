import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';

@Component({
  selector: 'rai-instances-page',
  template: ` <nav mat-tab-nav-bar>
      <a
        mat-tab-link
        routerLink="performance"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
      >
        Performance
      </a>
      <a
        mat-tab-link
        routerLink="fairness"
        routerLinkActive
        #rla1="routerLinkActive"
        [active]="rla1.isActive"
        [disabled]="!(protectedFeaturesSet$ | async)"
      >
        Fairness
      </a>
    </nav>
    <div style="height: calc(100% - 49px)">
      <router-outlet></router-outlet>
    </div>`,
})
export class InstancesPageComponent {
  protectedFeaturesSet$ = this.store.select(
    fromModel.selectProtectedFeaturesSet
  );

  constructor(private store: Store) {}
}
