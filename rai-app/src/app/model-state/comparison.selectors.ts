import { createSelector } from '@ngrx/store';
import * as fromModel from './reducers';
import {
  renamedOverviewMetricToGridArray,
  OverviewMetric,
} from '../core/models/overview-metric';

const selectOverviewItemsByType = (type: string) =>
  createSelector(fromModel.selectOverviewItemsByType(type), modelFoo);

const selectBaselineItemsByType = (type: string) =>
  createSelector(fromModel.selectBaselineItemsByType(type), baselineFoo);

export const selectBaselineSelectedByType = (type: string) =>
  createSelector(
    fromModel.selectOverviewSelectedByType(type),
    fromModel.selectBaselineItemsByType(type),
    (overviewSelected, baselineItems) =>
      baselineItems.find((b) => b.name === overviewSelected.name)
  );

const foo = (name: string) => (metrics: OverviewMetric[]) =>
  metrics.map((metric) => renamedOverviewMetricToGridArray(metric, name));

const modelFoo = foo('model');

const baselineFoo = foo('baseline');

export const selectAggregatesComparisonByType = (type: string) =>
  createSelector(
    selectOverviewItemsByType(type),
    selectBaselineItemsByType(type),
    mergeMetrics
  );

const mergeMetrics = (x: any[], y: any[]) =>
  x.map((metric) => ({
    ...metric,

    ...y.find((o) => o.metric === metric.metric),
  }));
