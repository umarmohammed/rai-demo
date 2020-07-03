import { NgModule } from '@angular/core';
import { DataGridSelectedDirective } from './data-grid-selected.component';
import { LimeChartComponent } from './lime-chart.component';
import { ChartsModule } from '../charts/charts.module';

@NgModule({
  declarations: [DataGridSelectedDirective, LimeChartComponent],
  exports: [DataGridSelectedDirective, LimeChartComponent],
  imports: [ChartsModule],
})
export class SharedModule {}
