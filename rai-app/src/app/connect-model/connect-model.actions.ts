import { createAction, props } from '@ngrx/store';

export const modelSelected = createAction(
  '[Connect Model Page] Model Selected',
  props<{ file: File }>()
);

export const featuresLoadedSuccess = createAction(
  '[Features API] Features Loaded Success',
  props<{ features: string[] }>()
);
