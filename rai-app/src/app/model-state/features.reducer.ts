import {
  featuresLoadedSuccess,
  modelSelected,
} from '../connect-model/connect-model.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { gminChanged, gmajChanged } from '../core/options/options.actions';

export const featuresFeatureKey = 'features';

export interface State {
  features: string[];
  loading: boolean;
  loaded: boolean;
  gmin: string | null;
  gmaj: string | null;
}

const initialState: State = {
  features: null,
  loading: false,
  loaded: false,
  gmin: null,
  gmaj: null,
};

const featuresReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, loading: true })),
  on(featuresLoadedSuccess, (state, { features }) => ({
    ...state,
    features,
    loading: false,
    loaded: true,
  })),
  on(gminChanged, (state, { gmin }) => ({
    ...state,
    gmin,
  })),
  on(gmajChanged, (state, { gmaj }) => ({ ...state, gmaj }))
);

export function reducer(state: State | undefined, action: Action) {
  return featuresReducer(state, action);
}

export const selectFeatures = (state: State) => state.features;
export const selectGmin = (state: State) => state.gmin;
export const selectGmaj = (state: State) => state.gmaj;
export const selectLoading = (state: State) => state.loading;
export const selectLoaded = (state: State) => state.loaded;
