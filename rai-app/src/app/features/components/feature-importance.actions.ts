import { createAction, props } from '@ngrx/store';

export const selectedPerformanceMetricChanged = createAction(
  '[Feature Importance Page] Selected Performance Metric Changed',
  props<{ selectedPerformanceMetric: string }>()
);

export const selectedFairnessMetricChanged = createAction(
  '[Feature Importance Page] Selected Fairness Metric Changed',
  props<{ selectedFairnessMetric: string }>()
);
