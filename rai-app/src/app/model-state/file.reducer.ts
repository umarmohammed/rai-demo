import { createReducer, on, Action } from '@ngrx/store';
import { modelSelected } from '../connect-model/connect-model.actions';

export const fileFeatureKey = 'file';

export interface State {
  file: File;
}

const initialState: State = {
  file: null,
};

const fileReducer = createReducer(
  initialState,
  on(modelSelected, (state, { file }) => ({ ...state, file }))
);

export function reducer(state: State | undefined, action: Action) {
  return fileReducer(state, action);
}

export const selectFile = (state: State) => state.file;
