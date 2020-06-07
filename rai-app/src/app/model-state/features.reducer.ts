import { featuresLoadedSuccess } from '../connect-model/connect-model.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const featuresFeatureKey = 'features';

export interface State {
  features: string[];
  gmin: string | null;
  gmaj: string | null;
}

const initialState: State = {
  features: null,
  gmin: null,
  gmaj: null,
};

const featuresReducer = createReducer(
  initialState,
  on(featuresLoadedSuccess, (state, { features }) => ({ ...state, features }))
);

export function reducer(state: State | undefined, action: Action) {
  return featuresReducer(state, action);
}

export const selectFeatures = (state: State) => state.features;
export const selectGmin = (state: State) => state.gmin;
export const selectGmaj = (state: State) => state.gmaj;
