import { NgModule } from '@angular/core';
import { InstancesPageComponent } from './instances-page.component';
import { Routes, RouterModule } from '@angular/router';
import { InstancesGridComponent } from './instances-grid.component';

const routes: Routes = [{ path: '', component: InstancesPageComponent }];

@NgModule({
  declarations: [InstancesPageComponent, InstancesGridComponent],
  imports: [RouterModule.forChild(routes)],
})
export class InstancesModule {}
