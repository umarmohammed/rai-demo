import { NgModule } from '@angular/core';
import { InstancesPageComponent } from './instances-page.component';
import { InstancesGridComponent } from './instances-grid.component';
import { MaterialModule } from '../material/material.module';
import { InstancesContainerComponent } from './instances-container.component';
import { InstancesRouterModule } from './instances-router.module';
import { InstancesRouteWrapperComponent } from './instances-route-wrapper.component';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { InstanceExplanationComponent } from './explanation/instance-explanation.component';
import { DataGridSelectedDirective } from './data-grid-selected.component';

@NgModule({
  declarations: [
    InstancesPageComponent,
    InstancesGridComponent,
    InstancesContainerComponent,
    InstancesRouteWrapperComponent,
    InstanceExplanationComponent,
    DataGridSelectedDirective,
  ],
  imports: [
    MaterialModule,
    InstancesRouterModule,
    CommonModule,
    AgGridModule.withComponents([]),
  ],
})
export class InstancesModule {}
