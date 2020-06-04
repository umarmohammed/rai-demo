import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { gminChanged, gmajChanged } from './options.actions';

export interface State {
  gmin: string | null;
  gmax: string | null;
}

export const initialState: State = {
  gmin: null,
  gmax: null,
};

const optionsReducer = createReducer(
  initialState,
  on(gminChanged, (state, { gmin }) => ({
    ...state,
    gmin,
  })),
  on(gmajChanged, (state, { gmaj }) => ({ ...state, gmaj }))
);

export function reducer(state: State | undefined, action: Action) {
  return optionsReducer(state, action);
}

const selectGmin = (state: State) => state.gmin;
const selectGmax = (state: State) => state.gmax;

export const optionsFetureKey = 'options';

export const selectOptionsState = createFeatureSelector(optionsFetureKey);

export const selectOptionsGmin = createSelector(selectOptionsState, selectGmin);
export const selectOptionsGmaj = createSelector(selectOptionsState, selectGmax);
