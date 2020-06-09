import { NgModule } from '@angular/core';
import { InstancesPageComponent } from './instances-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: InstancesPageComponent }];

@NgModule({
  declarations: [InstancesPageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class InstancesModule {}
