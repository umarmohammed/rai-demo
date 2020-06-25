import { Component } from '@angular/core';

@Component({
  selector: 'rai-adversarial-page',
  template: `<nav mat-tab-nav-bar>
      <a
        mat-tab-link
        routerLink="model"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
      >
        Overview
      </a>
      <a
        mat-tab-link
        routerLink="comparison"
        routerLinkActive
        #rla1="routerLinkActive"
        [active]="rla1.isActive"
      >
        Borderlines
      </a>
      <a
        mat-tab-link
        routerLink="comparison"
        routerLinkActive
        #rla1="routerLinkActive"
        [active]="rla1.isActive"
      >
        Inlines
      </a>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>`,
})
export class AdversarialPageComponent {}
