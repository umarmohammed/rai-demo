import * as fromFile from './file.reducer';
import * as fromFeatures from './features.reducer';
import * as fromOverview from './overview.reducer';
import * as fromInstances from './instances.reducer';
import * as fromFeatureImportance from './feature-importance.reducer';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { filterOverviewMetricsByType } from 'src/app/core/models/overview-metric';
import { fileToFormData } from 'src/app/connect-model/form-data';
import { protectedFeaturesSet } from 'src/app/core/models/selected-features';
import { featureScatterToMultiSeriesChart } from 'src/app/core/models/chart';

export const modelFeatureKey = 'model';

export interface ModelState {
  [fromFeatures.featuresFeatureKey]: fromFeatures.State;
  [fromFile.fileFeatureKey]: fromFile.State;
  [fromOverview.overviewFeatureKey]: fromOverview.State;
  [fromInstances.instancesFeatureKey]: fromInstances.State;
  [fromFeatureImportance.featureImportanceFeatureKey]: fromFeatureImportance.State;
}

export interface State {
  [modelFeatureKey]: ModelState;
}

export function reducers(state: ModelState | undefined, action: Action) {
  return combineReducers({
    [fromFile.fileFeatureKey]: fromFile.reducer,
    [fromFeatures.featuresFeatureKey]: fromFeatures.reducer,
    [fromOverview.overviewFeatureKey]: fromOverview.reducer,
    [fromInstances.instancesFeatureKey]: fromInstances.reducer,
    [fromFeatureImportance.featureImportanceFeatureKey]:
      fromFeatureImportance.reducer,
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

export const selectProtectedFeatures = createSelector(
  selectGmin,
  selectGmaj,
  (gmin, gmaj) => ({ gmin, gmaj })
);

export const selectProtectedFeaturesSet = createSelector(
  selectProtectedFeatures,
  protectedFeaturesSet
);

export const selectFileState = createSelector(
  selectModelState,
  (state) => state.file
);

export const selectFile = createSelector(selectFileState, fromFile.selectFile);

export const selectFormData = createSelector(selectFile, (file) =>
  fileToFormData({ file })
);

export const selectOverviewState = createSelector(
  selectModelState,
  (state) => state.overview
);

export const selectOverviewItems = createSelector(
  selectOverviewState,
  fromOverview.selectItems
);

export const selectOverviewItemsByType = (type: string) =>
  createSelector(selectOverviewItems, filterOverviewMetricsByType(type));

export const selectOverviewLoading = createSelector(
  selectOverviewState,
  fromOverview.selectLoading
);

export const selectOverviewSelectedByType = (type: string) =>
  createSelector(selectOverviewState, fromOverview.selectSelectedByType(type));

export const selectInstancesState = createSelector(
  selectModelState,
  (state) => state.instances
);

export const selectInstancesColumnNames = createSelector(
  selectInstancesState,
  fromInstances.selectColumnNames
);

export const selectInstancesItemsByType = (type: string) =>
  createSelector(selectInstancesState, fromInstances.selectItemsByType(type));

export const selectInstancesByType = (type: string) =>
  createSelector(selectInstancesItemsByType(type), (items) =>
    items.map((i) => i.instance)
  );

export const selectInstancesLoadingByType = (type: string) =>
  createSelector(selectInstancesState, fromInstances.selectLoadingByType(type));

export const selectInstancesSelectedItemIdByType = (type: string) =>
  createSelector(
    selectInstancesState,
    fromInstances.selectSelectedItemByType(type)
  );

export const selectInstancesSelectedItemByType = (type: string) =>
  createSelector(
    selectInstancesItemsByType(type),
    selectInstancesSelectedItemIdByType(type),
    (items, id) => items.find((i) => i.instance.id === id)
  );

export const selectInstancesDifficultiesByType = (type: string) =>
  createSelector(
    selectInstancesState,
    fromInstances.selectDifficultiesByType(type)
  );

export const selectFeatureImportanceState = createSelector(
  selectModelState,
  (state) => state.featureImportance
);

// TODO: refactor the whole select by type pattern.
// Can create an abstraction over it
export const selectFeatureImportanceMetricNames = createSelector(
  selectFeatureImportanceState,
  fromFeatureImportance.selectMetricNames
);

export const selectFeatureImportanceFeatures = createSelector(
  selectFeatureImportanceState,
  fromFeatureImportance.selectFeatures
);

export const selectFeatureImportanceLoading = createSelector(
  selectFeatureImportanceState,
  fromFeatureImportance.selectLoading
);

export const selectFeatureImportanceFairnessLoading = createSelector(
  selectFeatureImportanceState,
  fromFeatureImportance.selectFairnessLoading
);

export const selectFeatureScatter = createSelector(
  selectFeatureImportanceState,
  fromFeatureImportance.selectFeatureScatter
);

export const selectSomethingLoadingOnFeaturesSet = createSelector(
  selectProtectedFeatures,
  selectFeatureImportanceFairnessLoading,
  selectInstancesLoadingByType('fairness'),
  (protectedFeatures, featuresLoading, overviewLoading) =>
    protectedFeaturesSet(protectedFeatures) &&
    (featuresLoading || overviewLoading)
);
