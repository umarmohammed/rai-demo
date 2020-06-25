import { Adversarials } from 'src/app/core/models/attack-response';
import { on, createReducer, Action } from '@ngrx/store';
import {
  modelSelected,
  attacksLoadedSuccess,
} from 'src/app/connect-model/connect-model.actions';

export const attackFeatureKey = 'attack';

export interface State {
  borderlines: Adversarials;
  inlines: Adversarials;
  loading: boolean;
}

export const initialState: State = {
  borderlines: null,
  inlines: null,
  loading: false,
};

const attackReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, loading: true })),
  on(attacksLoadedSuccess, (state, { attack }) => ({
    ...state,
    ...attack,
    loading: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return attackReducer(state, action);
}

export const selectItemsByType = (type: string) => (state: State) =>
  type === 'inlines' ? state.inlines : state.borderlines;
