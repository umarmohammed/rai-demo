import * as fromFile from './file.reducer';
import * as fromFeatures from './features.reducer';
import * as fromOverview from './overview.reducer';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export const modelFeatureKey = 'model';

export interface ModelState {
  [fromFeatures.featuresFeatureKey]: fromFeatures.State;
  [fromFile.fileFeatureKey]: fromFile.State;
  [fromOverview.overviewFeatureKey]: fromOverview.State;
}

export interface State {
  [modelFeatureKey]: ModelState;
}

export function reducers(state: ModelState | undefined, action: Action) {
  return combineReducers({
    [fromFile.fileFeatureKey]: fromFile.reducer,
    [fromFeatures.featuresFeatureKey]: fromFeatures.reducer,
    [fromOverview.overviewFeatureKey]: fromOverview.reducer,
  })(state, action);
}

export const selectModelState = createFeatureSelector<State, ModelState>(
  modelFeatureKey
);

export const selectFeaturesState = createSelector(
  selectModelState,
  (state) => state.features
);

export const selectAllFeatures = createSelector(
  selectFeaturesState,
  fromFeatures.selectFeatures
);

export const selectFeaturesLoading = createSelector(
  selectFeaturesState,
  fromFeatures.selectLoading
);

export const selectFeaturesLoaded = createSelector(
  selectFeaturesState,
  fromFeatures.selectLoaded
);

export const selectGmin = createSelector(
  selectFeaturesState,
  fromFeatures.selectGmin
);

export const selectGmaj = createSelector(
  selectFeaturesState,
  fromFeatures.selectGmaj
);

export const selectFileState = createSelector(
  selectModelState,
  (state) => state.file
);

export const selectFile = createSelector(selectFileState, fromFile.selectFile);

export const selectOverviewState = createSelector(
  selectModelState,
  (state) => state.overview
);

export const selectOverviewItems = createSelector(
  selectOverviewState,
  fromOverview.selectItems
);

export const selectOverviewHistograms = createSelector(
  selectOverviewItems,
  (items) => items && items[0].histogram
);

export const selectOverviewLoading = createSelector(
  selectOverviewState,
  fromOverview.selectLoading
);
