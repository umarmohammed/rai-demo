import {
  createReducer,
  Action,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { modelSelected, featuresLoadedSuccess } from './connect-model.actions';

export interface State {
  file: File;
  features: string[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  file: null,
  features: null,
  loading: false,
  loaded: false,
};

export const connectModelFeatureKey = 'connectModel';

const connectModelReducer = createReducer(
  initialState,
  on(modelSelected, (state, { file }) => ({
    ...state,
    file,
    loaded: false,
    loading: true,
  })),
  on(featuresLoadedSuccess, (state, { features }) => ({
    ...state,
    features,
    loading: false,
    loaded: true,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return connectModelReducer(state, action);
}

const selectFile = (state: State) => state.file;
const selectFeatures = (state: State) => state.features;
const selectLoading = (state: State) => state.loading;

export const selectConnectModelState = createFeatureSelector(
  connectModelFeatureKey
);

export const selectConnectModelFile = createSelector(
  selectConnectModelState,
  selectFile
);

export const selectConnectModelFeatures = createSelector(
  selectConnectModelState,
  selectFeatures
);

export const selectConnectModelLoading = createSelector(
  selectConnectModelState,
  selectLoading
);
