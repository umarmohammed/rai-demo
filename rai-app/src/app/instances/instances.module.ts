import { NgModule } from '@angular/core';
import { InstancesPageComponent } from './instances-page.component';
import { Routes, RouterModule } from '@angular/router';
import { InstancesGridComponent } from './instances-grid.component';
import { MaterialModule } from '../material/material.module';
import { InstancesContainerComponent } from './instances-container.component';

const routes: Routes = [
  {
    path: '',
    component: InstancesPageComponent,
    children: [
      { path: 'performance', component: InstancesContainerComponent },
      { path: 'fairness', component: InstancesContainerComponent },
      { path: '', redirectTo: 'performance', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    InstancesPageComponent,
    InstancesGridComponent,
    InstancesContainerComponent,
  ],
  imports: [MaterialModule, RouterModule.forChild(routes)],
})
export class InstancesModule {}
