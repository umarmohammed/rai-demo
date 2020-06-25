import { createAction, props } from '@ngrx/store';
import { BootstrapResponse } from '../core/models/bootstrap-response';
import { PermutationResponse } from '../core/models/permutation-response';
import { AttackResponse } from '../core/models/attack-response';

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
  props<{ bootstrap: BootstrapResponse }>()
);

export const baselineLoadedSuccess = createAction(
  '[Baseline API] Baseline Loaded Success',
  props<{ bootstrap: BootstrapResponse }>()
);

export const bootstrapLoadedWithFairnessSuccess = createAction(
  '[Bootstrap API] Bootstrap Loaded With Fairness Success',
  props<{ bootstrap: BootstrapResponse }>()
);

export const baselineLoadedWithFairnessSuccess = createAction(
  '[Baseline API] Baseline Loaded With Fairness Success',
  props<{ bootstrap: BootstrapResponse }>()
);

export const permuationLoadedSuccess = createAction(
  '[Permutation API] Permutation Loaded Success',
  props<{ permutation: PermutationResponse }>()
);

export const permuationLoadedWithFairnessSuccess = createAction(
  '[Permutation API] Permutation Loaded With Fairness Success',
  props<{ permutation: PermutationResponse }>()
);

export const attacksLoadedSuccess = createAction(
  '[Attacks API] Attacks Loaded Success',
  props<{ attack: AttackResponse }>()
);
