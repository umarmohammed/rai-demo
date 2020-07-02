import { NgModule } from '@angular/core';
import { AdversarialPageComponent } from './adverserial-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AdversarialOverviewComponent } from './overview/adversarial-overview.component';
import { AdversarialAttacksWrapperComponent } from './attacks/adversarial-attacks-wrapper.component';
import { CommonModule } from '@angular/common';
import { AdversarialAttacksContainerComponent } from './attacks/adversarial-attacks-container.component';
import { AdversarialAttacksExplanationComponent } from './attacks/adversarial-attacks-explanation.component';
import { AgGridModule } from 'ag-grid-angular';
import { AdversarialAttacksGridComponent } from './attacks/adversarial-attacks-grid.component';
import { AdversarialAttacksComparisonComponent } from './attacks/adversarial-attacks-comparison.component';

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
    AdversarialAttacksGridComponent,
    AdversarialAttacksComparisonComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    AgGridModule.withComponents([]),
  ],
})
export class AdversarialModule {}
