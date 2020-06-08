import { Component, Input, OnInit } from '@angular/core';
import * as fromModel from '../../model-state/reducers';
import { Store } from '@ngrx/store';
import { performanceMetricSelected } from '../overview.actions';
import {
  overviewMetricToHistogramChart,
  OverviewMetric,
  HistogramChart,
} from '../../core/models/overview-metric';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'rai-metric-overview',
  template: `
    <div class="container">
      <rai-metric-histogram
        class="histogram"
        [histogram]="histogram$ | async"
      ></rai-metric-histogram>
      <rai-metric-aggregates
        class="aggregates"
        (metricSelected)="onPerformanceMetricSelected($event)"
        [selected]="selected$ | async"
        [overviewMetrics]="items$ | async"
      ></rai-metric-aggregates>
    </div>
  `,
  styleUrls: ['metric-overview.component.scss'],
})
export class MetricOverviewComponent implements OnInit {
  @Input() type: string;

  selected$: Observable<OverviewMetric>;
  histogram$: Observable<HistogramChart>;
  items$: Observable<OverviewMetric[]>;

  constructor(private store: Store<fromModel.State>) {}

  ngOnInit(): void {
    this.items$ = this.store.select(
      fromModel.selectOverviewItemsByType(this.type)
    );
    this.selected$ = this.store.select(
      fromModel.selectOverviewSelectedByType(this.type)
    );
    this.histogram$ = this.selected$.pipe(map(overviewMetricToHistogramChart));
  }

  onPerformanceMetricSelected(selectedPerformance: string) {
    this.store.dispatch(performanceMetricSelected({ selectedPerformance }));
  }
}
