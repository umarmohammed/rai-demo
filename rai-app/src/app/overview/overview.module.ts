import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview.component';
import { Routes, RouterModule } from '@angular/router';
import { MetricHistogramComponent } from './metric-histogram.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MetricAggregatesComponent } from './metric-aggregates.component';

export const routes: Routes = [{ path: '', component: OverviewComponent }];

@NgModule({
  declarations: [
    OverviewComponent,
    MetricHistogramComponent,
    MetricAggregatesComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class OverviewModule {}
