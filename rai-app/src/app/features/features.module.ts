import { NgModule } from '@angular/core';
import { FeaturesPageComponent } from './features-page.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [{ path: '', component: FeaturesPageComponent }];

@NgModule({
  declarations: [FeaturesPageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class FeaturesModule {}
