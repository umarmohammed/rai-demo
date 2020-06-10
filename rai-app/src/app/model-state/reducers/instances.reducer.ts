import { createReducer, on, Action } from '@ngrx/store';
import {
  modelSelected,
  bootstrapLoadedSuccess,
  bootstrapLoadedWithFairnessSuccess,
} from 'src/app/connect-model/connect-model.actions';
import { protectedFeatureChanged } from 'src/app/core/options/options.actions';
import { protectedFeaturesSet } from 'src/app/core/models/selected-features';
import { Instance } from 'src/app/core/models/instance';
import {
  performaceInstanceSelected,
  fairnessInstanceSelected,
} from 'src/app/instances/instances-container.actions';

export const instancesFeatureKey = 'instances';

export interface State {
  columnNames: string[];
  performanceItems: Instance[];
  fairnessItems: Instance[];
  performanceLoading: boolean;
  fairnessLoading: boolean;
  selectedPerformanceId: string;
  selectedFairnessId: string;
}

export const initialState: State = {
  columnNames: null,
  performanceItems: null,
  fairnessItems: null,
  performanceLoading: false,
  fairnessLoading: false,
  selectedPerformanceId: null,
  selectedFairnessId: null,
};

const instancesReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, performanceLoading: true })),
  on(bootstrapLoadedSuccess, (state, { bootstrap }) => ({
    ...state,
    ...bootstrap,
    performanceLoading: false,
    selectedPerformanceId: bootstrap.performanceItems[0].instance.id,
  })),
  on(protectedFeatureChanged, (state, protectedFeatures) =>
    protectedFeaturesSet(protectedFeatures)
      ? { ...state, fairnessLoading: true }
      : state
  ),
  on(bootstrapLoadedWithFairnessSuccess, (state, { bootstrap }) => ({
    ...state,
    ...bootstrap,
    fairnessLoading: false,
    selectedFairnessId: bootstrap.fairnessItems[0].instance.id,
  })),
  on(performaceInstanceSelected, (state, { selectedPerformanceId }) => ({
    ...state,
    selectedPerformanceId,
  })),
  on(fairnessInstanceSelected, (state, { selectedFairnessId }) => ({
    ...state,
    selectedFairnessId,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return instancesReducer(state, action);
}

export const selectColumnNames = (state: State) => state.columnNames;

export const selectItemsByType = (type: string) => (state: State) =>
  type === 'performance' ? state.performanceItems : state.fairnessItems;
export const selectLoadingByType = (type: string) => (state: State) =>
  type === 'performance' ? state.performanceLoading : state.fairnessLoading;

export const selectSelectedItemByType = (type: string) => (state: State) =>
  type === 'performance'
    ? state.selectedPerformanceId
    : state.selectedFairnessId;
