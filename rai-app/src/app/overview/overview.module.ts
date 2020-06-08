import { NgModule } from '@angular/core';
import { MetricOverviewComponent } from './metric-overview.component';
import { Routes, RouterModule } from '@angular/router';
import { MetricHistogramComponent } from './metric-histogram.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MetricAggregatesComponent } from './metric-aggregates.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OverviewPageComponent } from './overview-page.component';

export const routes: Routes = [{ path: '', component: OverviewPageComponent }];

@NgModule({
  declarations: [
    OverviewPageComponent,
    MetricOverviewComponent,
    MetricHistogramComponent,
    MetricAggregatesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NgxChartsModule,
  ],
})
export class OverviewModule {}
