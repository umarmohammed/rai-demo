import { createAction, props } from '@ngrx/store';

export const modelSelected = createAction(
  '[Connect Model Page] Model Selected',
  props<{ file: File }>()
);
