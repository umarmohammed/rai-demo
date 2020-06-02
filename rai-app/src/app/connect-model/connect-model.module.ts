import { NgModule } from '@angular/core';
import { ConnectModelComponent } from './connect-model.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducer, connectModelFeatureKey } from './connect-model.reducer';

const routes: Routes = [
  {
    path: '',
    component: ConnectModelComponent,
  },
];

@NgModule({
  declarations: [ConnectModelComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    StoreModule.forFeature(connectModelFeatureKey, reducer),
  ],
})
export class ConnectModelModule {}
