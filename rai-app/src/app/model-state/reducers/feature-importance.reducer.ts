import { on, createReducer, Action } from '@ngrx/store';
import {
  modelSelected,
  permuationLoadedSuccess,
  permuationLoadedWithFairnessSuccess,
} from 'src/app/connect-model/connect-model.actions';
import { FeatureMetric } from 'src/app/core/models/feature-metric';
import { FeatureScatter } from 'src/app/core/models/permutation-response';

export const featureImportanceFeatureKey = 'featureImportance';

export interface State {
  features: FeatureMetric[];
  metricNames: string[];
  loading: boolean;
  featureScatter: FeatureScatter;
}

export const initialState: State = {
  features: null,
  metricNames: null,
  loading: false,
  featureScatter: null,
};

const featureImportanceReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, loading: true })),

  on(permuationLoadedSuccess, (state, { permutation }) => ({
    ...state,
    ...permutation,
    loading: false,
  })),

  on(permuationLoadedWithFairnessSuccess, (state, { permutation }) => ({
    ...state,
    ...permutation,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureImportanceReducer(state, action);
}

export const selectFeatures = (state: State) => state.features;
export const selectMetricNames = (state: State) => state.metricNames;
export const selectLoading = (state: State) => state.loading;
export const selectFeatureScatter = (state: State) => state.featureScatter;
