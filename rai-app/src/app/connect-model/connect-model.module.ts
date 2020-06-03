import { NgModule } from '@angular/core';
import { ConnectModelComponent } from './connect-model.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducer, connectModelFeatureKey } from './connect-model.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConnectModelEffects } from './connect-model.effects';

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
    EffectsModule.forFeature([ConnectModelEffects]),
  ],
})
export class ConnectModelModule {}
