import { createAction, props } from '@ngrx/store';

export const performaceInstanceSelected = createAction(
  '[Instances Page] Performance Instance Selected',
  props<{ selectedPerformanceId: string }>()
);

export const fairnessInstanceSelected = createAction(
  '[Instances Page] Fairness Instance Selected',
  props<{ selectedFairnessId: string }>()
);
