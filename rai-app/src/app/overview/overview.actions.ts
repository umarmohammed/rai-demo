import { createAction, props } from '@ngrx/store';

export const performanceMetricSelected = createAction(
  '[Overview Page] Performance Metric Selected',
  props<{ selectedPerformance: string }>()
);

export const fairnessMetricSelected = createAction(
  '[Overview Page] Fairness Metric Selected',
  props<{ selectedFairness: string }>()
);
