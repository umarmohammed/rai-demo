import { OverviewMetric } from 'src/app/core/models/overview-metric';
import { createReducer, on, Action } from '@ngrx/store';
import {
  modelSelected,
  bootstrapLoadedSuccess,
} from 'src/app/connect-model/connect-model.actions';
import { protectedFeatureChanged } from 'src/app/core/options/options.actions';

export const overviewFeatureKey = 'overview';

export interface State {
  items: OverviewMetric[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  items: null,
  loaded: false,
  loading: false,
};

const overviewReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, loading: true, loaded: false })),
  on(bootstrapLoadedSuccess, (state, { overview }) => ({
    ...state,
    loaded: true,
    loading: false,
    items: overview,
  })),
  on(protectedFeatureChanged, (state, { gmin, gmaj }) =>
    !!gmin && !!gmaj
      ? {
          ...state,
          loaded: false,
          loading: true,
        }
      : state
  )
);

export function reducer(state: State | undefined, action: Action) {
  return overviewReducer(state, action);
}

export const selectItems = (state: State) => state.items;
export const selectLoaded = (state: State) => state.loaded;
export const selectLoading = (state: State) => state.loading;
