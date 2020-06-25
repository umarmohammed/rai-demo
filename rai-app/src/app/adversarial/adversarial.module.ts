import { NgModule } from '@angular/core';
import { AdversarialPageComponent } from './adverserial-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AdversarialOverviewComponent } from './overview/adversarial-overview.component';

const routes: Routes = [
  {
    path: '',
    component: AdversarialPageComponent,
    children: [
      { path: 'overview', component: AdversarialOverviewComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [AdversarialPageComponent],
  imports: [RouterModule.forChild(routes), MaterialModule],
})
export class AdversarialModule {}
