import {
  createReducer,
  Action,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { modelSelected } from './connect-model.actions';

export interface State {
  file: File;
}

export const initialState: State = {
  file: null,
};

export const connectModelFeatureKey = 'connectModel';

const connectModelReducer = createReducer(
  initialState,
  on(modelSelected, (state, { file }) => {
    return { ...state, file };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return connectModelReducer(state, action);
}

const selectFile = (state: State) => state.file;

export const selectConnectModelState = createFeatureSelector(
  connectModelFeatureKey
);
export const selectFileState = createSelector(
  selectConnectModelState,
  selectFile
);
