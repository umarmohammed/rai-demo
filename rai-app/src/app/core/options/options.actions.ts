import { createAction, props } from '@ngrx/store';
import { SelectedFeatures } from '../models/selected-features';

export const protectedFeatureChanged = createAction(
  '[Options Page] Protected Feature Changed',
  props<SelectedFeatures>()
);
