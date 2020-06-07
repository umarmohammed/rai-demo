import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { modelFeatureKey, reducers } from './reducers';

@NgModule({
  imports: [StoreModule.forFeature(modelFeatureKey, reducers)],
})
export class ModelStateModule {}
