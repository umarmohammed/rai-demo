import { createReducer, on, Action } from '@ngrx/store';
import {
  modelSelected,
  bootstrapLoadedSuccess,
  bootstrapLoadedWithFairnessSuccess,
} from 'src/app/connect-model/connect-model.actions';
import { protectedFeatureChanged } from 'src/app/core/options/options.actions';
import { protectedFeaturesSet } from 'src/app/core/models/selected-features';
import { state } from '@angular/animations';

export const instancesFeatureKey = 'instances';

export interface State {
  columnNames: string[];
  performanceItems: any[];
  fairnessItems: any[];
  performanceLoading: boolean;
  fairnessLoading: boolean;
}

export const initialState: State = {
  columnNames: null,
  performanceItems: null,
  fairnessItems: null,
  performanceLoading: false,
  fairnessLoading: false,
};

const instancesReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, performanceLoading: true })),
  on(bootstrapLoadedSuccess, (state, { bootstrap }) => ({
    ...state,
    columnNames: bootstrap.columnDefs,
    performanceItems: bootstrap.performanceInstances,
    performanceLoading: false,
  })),
  on(protectedFeatureChanged, (state, protectedFeatures) =>
    protectedFeaturesSet(protectedFeatures)
      ? { ...state, fairnessLoading: true }
      : state
  ),
  on(bootstrapLoadedWithFairnessSuccess, (state, { bootstrap }) => ({
    ...state,
    fairnessLoading: false,
    fairnessItems: bootstrap.fairnessInstances,
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
