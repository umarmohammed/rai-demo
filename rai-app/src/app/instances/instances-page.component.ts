import { Component } from '@angular/core';
import { WindowService } from '../core/window.service';

@Component({
  selector: 'rai-instances-page',
  template: `
    <nav mat-tab-nav-bar *ngIf="protectedFeaturesSet$ | async">
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
      >
        Fairness
      </a>
    </nav>
    <div class="container" [class.nav-barred]="protectedFeaturesSet$ | async">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['instances-page.component.scss'],
})
export class InstancesPageComponent {
  protectedFeaturesSet$ = this.windowService.protectedFeaturesSet$;

  constructor(private windowService: WindowService) {}
}
