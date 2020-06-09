import { on, createReducer, Action } from '@ngrx/store';
import {
  modelSelected,
  permuationLoadedSuccess,
} from 'src/app/connect-model/connect-model.actions';
import { FeatureMetric } from 'src/app/core/models/feature-metric';
import { selectedPerformanceMetricChanged } from 'src/app/features/feature-importance.actions';

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
  )
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
