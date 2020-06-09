import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstancesPageComponent } from './instances-page.component';
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstancesRouterModule {}
