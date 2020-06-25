import { NgModule } from '@angular/core';
import { AdversarialPageComponent } from './adverserial-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: AdversarialPageComponent }];

@NgModule({
  declarations: [AdversarialPageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class AdversarialModule {}
