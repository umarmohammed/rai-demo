import { NgModule } from '@angular/core';
import { AdversarialPageComponent } from './adverserial-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AdversarialOverviewComponent } from './overview/adversarial-overview.component';
import { AdversarialAttacksWrapperComponent } from './attacks/adversarial-attacks-wrapper.component';
import { CommonModule } from '@angular/common';
import { AdversarialAttacksContainerComponent } from './attacks/adversarial-attacks-container.component';
import { AdversarialAttacksExplanationComponent } from './attacks/adversarial-attacks-explanation.component';

const routes: Routes = [
  {
    path: '',
    component: AdversarialPageComponent,
    children: [
      { path: 'overview', component: AdversarialOverviewComponent },
      { path: 'borderlines', component: AdversarialAttacksWrapperComponent },
      { path: 'inlines', component: AdversarialAttacksWrapperComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    AdversarialPageComponent,
    AdversarialAttacksWrapperComponent,
    AdversarialAttacksContainerComponent,
    AdversarialAttacksExplanationComponent,
  ],
  imports: [RouterModule.forChild(routes), MaterialModule, CommonModule],
})
export class AdversarialModule {}
