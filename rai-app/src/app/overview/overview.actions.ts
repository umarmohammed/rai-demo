import { createAction, props } from '@ngrx/store';

export const performanceMetricSelected = createAction(
  '[Overview Page] Metric Selected',
  props<{ selectedPerformance: string }>()
);
