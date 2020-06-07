import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview.component';
import { Routes, RouterModule } from '@angular/router';
import { MetricHistogramComponent } from './metric-histogram.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [{ path: '', component: OverviewComponent }];

@NgModule({
  declarations: [OverviewComponent, MetricHistogramComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OverviewModule {}
