import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import {
  featureMetricToChart,
  getChartMin,
  Chart,
  featureScatterToMultiSeriesChart,
} from '../core/models/chart';
import { range } from '../core/array-util';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeatureImportanceService {
  private xAxisSelectedFeatureIndexSubject = new BehaviorSubject<number>(0);
  private yAxisSelectedFeatureIndexSubject = new BehaviorSubject<number>(0);

  private axisToSubjectMap = {
    x: this.xAxisSelectedFeatureIndexSubject,
    y: this.yAxisSelectedFeatureIndexSubject,
  };

  features$ = this.store.select(fromModel.selectFeatureImportanceFeatures);
  metricNames$ = this.store.select(
    fromModel.selectFeatureImportanceMetricNames
  );
  loading$ = this.store.select(fromModel.selectFeatureImportanceLoading);

  scatterChart$ = this.store
    .select(fromModel.selectFeatureScatter)
    .pipe(
      switchMap((featureScatter) =>
        combineLatest([
          this.getSelectedMetricName(this.xAxisSelectedFeatureIndexSubject),
          this.getSelectedMetricName(this.yAxisSelectedFeatureIndexSubject),
        ]).pipe(
          map(([metricX, metricY]) =>
            featureScatterToMultiSeriesChart(featureScatter, metricX, metricY)
          )
        )
      )
    );

  constructor(private store: Store) {}

  xAxisSelectedFeatureChanged(index: number) {
    this.xAxisSelectedFeatureIndexSubject.next(index);
  }

  yAxisSelectedFeatureChanged(index: number) {
    this.yAxisSelectedFeatureIndexSubject.next(index);
  }

  getStuffForAxis(axis: string) {
    const selectedFeature$ = this.getSelectedFeature(
      this.axisToSubjectMap[axis]
    );
    const chart$ = selectedFeature$.pipe(map(featureMetricToChart));
    const chartXScaleMin$ = this.getChartXScaleMin(chart$);

    const selectedMetricName$ = this.getSelectedMetricName(
      this.axisToSubjectMap[axis]
    );
    return { selectedMetricName$, chart$, chartXScaleMin$ };
  }

  private getSelectedFeature(index$: Observable<number>) {
    return this.store
      .select(fromModel.selectFeatureImportanceFeatures)
      .pipe(
        switchMap((features) => index$.pipe(map((index) => features[index])))
      );
  }

  private getSelectedMetricName(index$: Observable<number>) {
    return this.store
      .select(fromModel.selectFeatureImportanceMetricNames)
      .pipe(
        switchMap((metricNames) =>
          index$.pipe(map((index) => metricNames[index]))
        )
      );
  }

  private getChartXScaleMin(chart$: Observable<Chart>) {
    return chart$.pipe(
      map((chart) => getChartMin(range(chart.series.map((s) => s.value))))
    );
  }
}
