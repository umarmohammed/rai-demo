import { on, createReducer, Action } from '@ngrx/store';
import {
  modelSelected,
  permuationLoadedSuccess,
  permuationLoadedWithFairnessSuccess,
} from 'src/app/connect-model/connect-model.actions';
import { FeatureMetric } from 'src/app/core/models/feature-metric';
import {
  selectedPerformanceMetricChanged,
  selectedFairnessMetricChanged,
} from 'src/app/features/feature-importance.actions';
import { protectedFeaturesSet } from 'src/app/core/models/selected-features';
import { protectedFeatureChanged } from 'src/app/core/options/options.actions';

export const featureImportanceFeatureKey = 'featureImportance';

export interface State {
  performanceItems: FeatureMetric[];
  fairnessItems: FeatureMetric[];
  performanceMetricNames: string[];
  fairnessMetricNames: string[];
  performanceLoading: boolean;
  fairnessLoading: boolean;
  selectedPerformanceMetric: string;
  selectedFairnessMetric: string;
}

export const initialState: State = {
  performanceItems: null,
  fairnessItems: null,
  performanceMetricNames: null,
  fairnessMetricNames: null,
  performanceLoading: false,
  fairnessLoading: false,
  selectedPerformanceMetric: null,
  selectedFairnessMetric: null,
};

const featureImportanceReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, performanceLoading: true })),
  on(permuationLoadedSuccess, (state, { permutation }) => ({
    ...state,
    performanceLoading: false,
    performanceMetricNames: permutation.performanceMetricNames,
    performanceItems: permutation.performanceFeatures,
    selectedPerformanceMetric: permutation.performanceMetricNames[0], // TODO just store index
  })),
  on(
    selectedPerformanceMetricChanged,
    (state, { selectedPerformanceMetric }) => ({
      ...state,
      selectedPerformanceMetric,
    })
  ),
  on(selectedFairnessMetricChanged, (state, { selectedFairnessMetric }) => ({
    ...state,
    selectedFairnessMetric,
  })),
  on(protectedFeatureChanged, (state, protectedFeatures) =>
    protectedFeaturesSet(protectedFeatures)
      ? { ...state, fairnessLoading: true }
      : state
  ),
  on(permuationLoadedWithFairnessSuccess, (state, { permutation }) => ({
    ...state,
    fairnessLoading: false,
    performanceItems: permutation.performanceFeatures,
    fairnessItems: permutation.fairnessFeatures,
    fairnessMetricNames: permutation.fairnessMetricNames,
    selectedFairnessMetric: permutation.fairnessMetricNames[0],
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureImportanceReducer(state, action);
}

export const selectItemsByType = (type: string) => (state: State) =>
  type === 'performance' ? state.performanceItems : state.fairnessItems;

export const selectMetricNamesByType = (type: string) => (state: State) =>
  type === 'performance'
    ? state.performanceMetricNames
    : state.fairnessMetricNames;

export const selectLoadingByType = (type: string) => (state: State) =>
  type === 'performance' ? state.performanceLoading : state.fairnessLoading;

export const selectSelectedByType = (type: string) => (state: State) =>
  type === 'performance'
    ? state.selectedPerformanceMetric
    : state.selectedFairnessMetric;
