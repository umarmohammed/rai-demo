import { on, createReducer, Action } from '@ngrx/store';
import {
  modelSelected,
  permuationLoadedSuccess,
  permuationLoadedWithFairnessSuccess,
} from 'src/app/connect-model/connect-model.actions';
import { FeatureMetric } from 'src/app/core/models/feature-metric';
import { FeatureScatter } from 'src/app/core/models/permutation-response';
import { protectedFeatureChanged } from 'src/app/core/options/options.actions';
import { protectedFeaturesSet } from 'src/app/core/models/selected-features';

export const featureImportanceFeatureKey = 'featureImportance';

export interface State {
  features: FeatureMetric[];
  metricNames: string[];
  loading: boolean;
  fairnessLoading: boolean;
  featureScatter: FeatureScatter;
}

export const initialState: State = {
  features: null,
  metricNames: null,
  loading: false,
  fairnessLoading: false,
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
    fairnessLoading: false,
  })),
  on(protectedFeatureChanged, (state, protectedFeatures) =>
    protectedFeaturesSet(protectedFeatures)
      ? { ...state, fairnessLoading: true }
      : state
  )
);

export function reducer(state: State | undefined, action: Action) {
  return featureImportanceReducer(state, action);
}

export const selectFeatures = (state: State) => state.features;
export const selectMetricNames = (state: State) => state.metricNames;
export const selectLoading = (state: State) => state.loading;
export const selectFeatureScatter = (state: State) => state.featureScatter;
export const selectFairnessLoading = (state: State) => state.fairnessLoading;
