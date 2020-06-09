import { NgModule } from '@angular/core';
import { InstancesPageComponent } from './instances-page.component';
import { Routes, RouterModule } from '@angular/router';
import { InstancesGridComponent } from './instances-grid.component';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [
  {
    path: '',
    component: InstancesPageComponent,
    children: [
      { path: 'performance', component: InstancesGridComponent },
      { path: 'fairness', component: InstancesGridComponent },
      { path: '', redirectTo: 'performance', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [InstancesPageComponent, InstancesGridComponent],
  imports: [MaterialModule, RouterModule.forChild(routes)],
})
export class InstancesModule {}
