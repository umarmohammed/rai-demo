import { createSelector } from '@ngrx/store';
import * as fromModel from './reducers';
import {
  renamedOverviewMetricToGridArray,
  OverviewMetric,
} from '../core/models/overview-metric';
import { overviewMetricToChart } from '../core/models/chart';

const selectOverviewItemsByType = (type: string) =>
  createSelector(fromModel.selectOverviewItemsByType(type), modelFoo);

const selectBaselineItemsByType = (type: string) =>
  createSelector(fromModel.selectBaselineItemsByType(type), baselineFoo);

export const selectBaselineSelectedByType = (type: string) =>
  createSelector(
    fromModel.selectOverviewSelectedByType(type),
    fromModel.selectBaselineItemsByType(type),
    (overviewSelected, baselineItems) =>
      baselineItems.find((b) => b.key === overviewSelected.key)
  );

export const selectComparisonCharts = (type: string) =>
  createSelector(
    fromModel.selectOverviewSelectedByType(type),
    selectBaselineSelectedByType(type),
    getComparisonCharts
  );

function getComparisonCharts(...metrics: OverviewMetric[]) {
  return metrics.map(overviewMetricToChart);
}

const foo = (name: string) => (metrics: OverviewMetric[]) =>
  metrics.map((metric) => renamedOverviewMetricToGridArray(metric, name));

const modelFoo = foo('model');

const baselineFoo = foo('baseline');

export const selectAggregatesComparisonByType = (type: string) =>
  createSelector(
    selectOverviewItemsByType(type),
    selectBaselineItemsByType(type),
    mergeMetrics(type)
  );

const mergeMetrics = (type: string) => (x: any[], y: any[]) =>
  x
    .map((metric) => ({
      ...metric,
      ...y.find((o) => o.metric === metric.metric),
    }))
    .map((metric) => ({
      ...metric,
      isGood:
        type === 'fairness'
          ? metric.model_isFair
          : metric.model_mean > metric.baseline_mean,
    }));
