import { createAction, props } from '@ngrx/store';

export const selectedPerformanceMetricChanged = createAction(
  '[Feature Importance Page] Selected Performance Metric Changed',
  props<{ selectedPerformanceMetric: string }>()
);
