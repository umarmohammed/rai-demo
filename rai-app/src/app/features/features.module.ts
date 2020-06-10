import { NgModule } from '@angular/core';
import { FeaturesPageComponent } from './features-page.component';
import { Routes, RouterModule } from '@angular/router';
import { FeatureImportanceComponent } from './feature-importance.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FeatureImportanceScatterComponent } from './feature-importance-scatter.component';

export const routes: Routes = [{ path: '', component: FeaturesPageComponent }];

@NgModule({
  declarations: [
    FeaturesPageComponent,
    FeatureImportanceComponent,
    FeatureImportanceScatterComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    NgxChartsModule,
  ],
})
export class FeaturesModule {}
