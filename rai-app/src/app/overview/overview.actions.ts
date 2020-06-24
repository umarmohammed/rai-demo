import { createAction, props } from '@ngrx/store';

export const performanceMetricSelected = createAction(
  '[Overview Page] Performance Metric Selected',
  props<{ selectedPerformance: string }>()
);

export const fairnessMetricSelected = createAction(
  '[Overview Page] Fairness Metric Selected',
  props<{ selectedFairness: string }>()
);

export const comparePerformanceMetricSelected = createAction(
  '[Comparison Page] Performance Metric Selected',
  props<{ selectedPerformance: string }>()
);

export const compareFairnessMetricSelected = createAction(
  '[Compare Page] Fairness Metric Selected',
  props<{ selectedFairness: string }>()
);
