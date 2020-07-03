import { Adversarials } from 'src/app/core/models/attack-response';
import { on, createReducer, Action } from '@ngrx/store';
import {
  modelSelected,
  attacksLoadedSuccess,
} from 'src/app/connect-model/connect-model.actions';
import {
  inlineItemSelected,
  borderlineItemSelected,
} from 'src/app/adversarial/attacks/adversarial-attacks-container.actions';

export const attackFeatureKey = 'attack';

export interface State {
  borderlines: Adversarials;
  inlines: Adversarials;
  columnNames: string[];
  loading: boolean;
  selectedBorderlineId: number;
  selectedInlineId: number;
}

export const initialState: State = {
  borderlines: null,
  columnNames: null,
  inlines: null,
  loading: false,
  selectedBorderlineId: 0,
  selectedInlineId: 0,
};

const attackReducer = createReducer(
  initialState,
  on(modelSelected, (state) => ({ ...state, loading: true })),
  on(attacksLoadedSuccess, (state, { attack }) => ({
    ...state,
    ...attack,
    loading: false,
  })),
  on(inlineItemSelected, (state, { selectedInlineId }) => ({
    ...state,
    selectedInlineId,
  })),
  on(borderlineItemSelected, (state, { selectedBorderlineId }) => ({
    ...state,
    selectedBorderlineId,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return attackReducer(state, action);
}

export const selectLoading = (state: State) => state.loading;

export const selectItemsByType = (type: string) => (state: State) =>
  type === 'inlines' ? state.inlines : state.borderlines;

export const selectColumnNames = (state: State) => state.columnNames;

export const selectSelectedItemIdByType = (type: string) => (state: State) =>
  type === 'inlines' ? state.selectedInlineId : state.selectedBorderlineId;

export const selectExplanationsByType = (type: string) => (state: State) =>
  type === 'inlines'
    ? state.inlines.explanations
    : state.borderlines.explanations;
