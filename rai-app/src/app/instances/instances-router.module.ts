import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstancesPageComponent } from './instances-page.component';
import { InstancesRouteWrapperComponent } from './instances-route-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: InstancesPageComponent,
    children: [
      { path: 'performance', component: InstancesRouteWrapperComponent },
      { path: 'fairness', component: InstancesRouteWrapperComponent },
      { path: '', redirectTo: 'performance', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstancesRouterModule {}
