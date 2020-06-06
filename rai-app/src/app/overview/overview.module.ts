import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [{ path: '', component: OverviewComponent }];

@NgModule({
  declarations: [OverviewComponent],
  imports: [RouterModule.forChild(routes)],
})
export class OverviewModule {}
