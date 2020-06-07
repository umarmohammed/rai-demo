import { createAction, props } from '@ngrx/store';
import { OverviewMetric } from '../core/models/overview-metric';

export const modelSelected = createAction(
  '[Connect Model Page] Model Selected',
  props<{ file: File }>()
);

export const featuresLoadedSuccess = createAction(
  '[Features API] Features Loaded Success',
  props<{ features: string[] }>()
);

export const bootstrapLoadedSuccess = createAction(
  '[Bootstrap API] Bootstrap Loaded Success',
  props<{ overview: OverviewMetric[] }>()
);
