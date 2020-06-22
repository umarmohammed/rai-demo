import { Component } from '@angular/core';

@Component({
  selector: 'rai-overview-page',
  template: `
    <nav mat-tab-nav-bar>
      <a
        mat-tab-link
        routerLink="model"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
      >
        Model
      </a>
      <a
        mat-tab-link
        routerLink="comparison"
        routerLinkActive
        #rla1="routerLinkActive"
        [active]="rla1.isActive"
      >
        Comparison
      </a>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['overview-page.component.scss'],
})
export class OverviewPageComponent {}
