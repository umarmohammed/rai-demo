import { OverviewMetric } from 'src/app/core/models/overview-metric';
import { createReducer, on, Action } from '@ngrx/store';
import {
  modelSelected,
  baselineLoadedSuccess,
  baselineLoadedWithFairnessSuccess,
} from 'src/app/connect-model/connect-model.actions';

export const baselineFeatureKey = 'baseline';

export interface State {
  items: OverviewMetric[];
  loading: boolean;
  fairnessLoading: boolean;
}

export const initialState: State = {
  items: null,
  loading: false,
  fairnessLoading: false,
};

const baselineReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, loading: true })),
  on(baselineLoadedSuccess, (state, { bootstrap }) => ({
    ...state,
    loading: false,
    items: bootstrap.overview,
  })),
  on(baselineLoadedWithFairnessSuccess, (state, { bootstrap }) => ({
    ...state,
    fairnessLoading: false,
    items: bootstrap.overview,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return baselineReducer(state, action);
}

export const selectItems = (state: State) => state.items;
export const selectLoadingByType = (type: string) => (state: State) =>
  type === 'performance' ? state.loading : state.fairnessLoading;
