import { NgModule } from '@angular/core';
import { InstancesPageComponent } from './instances-page.component';
import { InstancesGridComponent } from './instances-grid.component';
import { MaterialModule } from '../material/material.module';
import { InstancesContainerComponent } from './instances-container.component';
import { InstancesRouterModule } from './instances-router.module';
import { InstancesRouteWrapperComponent } from './instances-route-wrapper.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    InstancesPageComponent,
    InstancesGridComponent,
    InstancesContainerComponent,
    InstancesRouteWrapperComponent,
  ],
  imports: [MaterialModule, InstancesRouterModule, CommonModule],
})
export class InstancesModule {}
