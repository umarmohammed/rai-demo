import { createAction, props } from '@ngrx/store';

export const gminChanged = createAction(
  '[Options Page] gmin Changed',
  props<{ gmin: string }>()
);

export const gmajChanged = createAction(
  '[Options Page] gmaj Changed',
  props<{ gmaj: string }>()
);
