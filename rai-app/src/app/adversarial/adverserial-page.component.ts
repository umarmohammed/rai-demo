import { Component } from '@angular/core';

@Component({
  selector: 'rai-adversarial-page',
  template: `<nav mat-tab-nav-bar>
      <a
        mat-tab-link
        routerLink="overview"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
      >
        Overview
      </a>
      <a
        mat-tab-link
        routerLink="borderlines"
        routerLinkActive
        #rla1="routerLinkActive"
        [active]="rla1.isActive"
      >
        Borderlines
      </a>
      <a
        mat-tab-link
        routerLink="inlines"
        routerLinkActive
        #rla2="routerLinkActive"
        [active]="rla2.isActive"
      >
        Inlines
      </a>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>`,
  styleUrls: ['adversarial-page.component.scss'],
})
export class AdversarialPageComponent {}
