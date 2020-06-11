import { OverviewMetric } from 'src/app/core/models/overview-metric';
import { createReducer, on, Action } from '@ngrx/store';
import {
  modelSelected,
  bootstrapLoadedSuccess,
  bootstrapLoadedWithFairnessSuccess,
} from 'src/app/connect-model/connect-model.actions';
import { protectedFeatureChanged } from 'src/app/core/options/options.actions';
import {
  performanceMetricSelected,
  fairnessMetricSelected,
} from 'src/app/overview/overview.actions';
import { protectedFeaturesSet } from 'src/app/core/models/selected-features';

export const overviewFeatureKey = 'overview';

export interface State {
  items: OverviewMetric[];
  loading: boolean;
  fairnessLoading: boolean;
  selectedPerformance: string;
  selectedFairness: string;
}

export const initialState: State = {
  items: null,
  fairnessLoading: false,
  loading: false,
  selectedPerformance: null,
  selectedFairness: null,
};

const overviewReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, loading: true, loaded: false })),
  on(bootstrapLoadedSuccess, (state, { bootstrap }) => ({
    ...state,
    loading: false,
    items: bootstrap.overview,
    selectedPerformance: bootstrap.overview.find(
      (o) => o.type === 'performance'
    ).name,
  })),
  on(bootstrapLoadedWithFairnessSuccess, (state, { bootstrap }) => ({
    ...state,
    fairnessLoading: false,
    items: bootstrap.overview,
    selectedPerformance: bootstrap.overview.find(
      (o) => o.type === 'performance'
    ).name,
    selectedFairness: bootstrap.overview.find((o) => o.type === 'fairness')
      .name,
  })),
  on(protectedFeatureChanged, (state, protectedFeatures) =>
    protectedFeaturesSet(protectedFeatures)
      ? {
          ...state,
          fairnessLoading: true,
        }
      : state
  ),
  on(performanceMetricSelected, (state, { selectedPerformance }) => ({
    ...state,
    selectedPerformance,
  })),
  on(fairnessMetricSelected, (state, { selectedFairness }) => ({
    ...state,
    selectedFairness,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return overviewReducer(state, action);
}

export const selectItems = (state: State) => state.items;
export const selectLoadingByType = (type: string) => (state: State) =>
  type === 'performance' ? state.loading : state.fairnessLoading;
export const selectSelectedByType = (type: string) => (state: State) =>
  state.items.find((i) => i.name === typeToSelected(type, state));

function typeToSelected(type: string, state: State) {
  return type === 'performance'
    ? state.selectedPerformance
    : state.selectedFairness;
}
