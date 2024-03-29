import { NgModule } from '@angular/core';
import { MetricOverviewComponent } from './containers/metric-overview.component';
import { Routes, RouterModule } from '@angular/router';
import { MetricHistogramComponent } from './components/metric-histogram.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MetricAggregatesComponent } from './components/metric-aggregates.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OverviewPageComponent } from './containers/overview-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';
import { OverviewModelComponent } from './containers/overview-model.component';
import { OverviewComparisonComponent } from './containers/comparison/overview-comparison.component';
import { MetricComparisonComponent } from './containers/comparison/metric-comparison.component';
import { ComparisonAggregatesComponent } from './components/comparison/comparison-aggregates.component';
import { ComparisonHistogramComponent } from './components/comparison/comparison-histogram.component';
import { ChartsModule } from '../charts/charts.module';

export const routes: Routes = [
  {
    path: '',
    component: OverviewPageComponent,
    children: [
      { path: 'model', component: OverviewModelComponent },
      { path: 'comparison', component: OverviewComparisonComponent },
      { path: '', redirectTo: 'model', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    OverviewPageComponent,
    MetricOverviewComponent,
    MetricHistogramComponent,
    MetricAggregatesComponent,
    OverviewModelComponent,
    OverviewComparisonComponent,
    MetricComparisonComponent,
    ComparisonAggregatesComponent,
    ComparisonHistogramComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ChartsModule,
    AgGridModule.withComponents([]),
    SharedModule,
  ],
})
export class OverviewModule {}
