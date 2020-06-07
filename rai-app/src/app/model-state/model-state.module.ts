import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { modelFeatureKey, reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ModelEffects } from './model.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(modelFeatureKey, reducers),
    EffectsModule.forFeature([ModelEffects]),
  ],
})
export class ModelStateModule {}
