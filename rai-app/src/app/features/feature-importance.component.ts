import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';
import { Chart, featureMetricToChart, blueScheme } from '../core/models/chart';
import { map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'rai-feature-importance',
  template: `
    <div *ngIf="!(loading$ | async)" class="container">
      <mat-form-field>
        <mat-label>Performance Metric</mat-label>
        <mat-select
          [value]="selected$ | async"
          (selectionChange)="selectionChange.emit($event.value)"
        >
          <mat-option *ngFor="let metric of metrics$ | async" [value]="metric">
            {{ metric }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <div class="chart-container">
        <ngx-charts-bar-horizontal
          [results]="(chart$ | async).series"
          [xAxis]="true"
          [yAxis]="true"
          [scheme]="blueScheme"
          [roundEdges]="false"
          [showDataLabel]="true"
          [maxYAxisTickLength]="30"
        >
        </ngx-charts-bar-horizontal>
      </div>
    </div>
    <mat-spinner class="spinner" [class.show]="loading$ | async"></mat-spinner>
  `,
  styleUrls: ['feature-importance.component.scss'],
})
export class FeatureImportanceComponent implements OnInit {
  @Input() type: string;
  @Output() selectionChange = new EventEmitter<string>();

  blueScheme = blueScheme;

  loading$: Observable<boolean>;
  chart$: Observable<Chart>;
  selected$: Observable<string>;
  metrics$: Observable<string[]>;

  constructor(private store: Store<fromModel.State>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(
      fromModel.selectFeatureImportanceLoadingByType(this.type)
    );

    this.chart$ = this.store
      .select(fromModel.selectFeatureImportanceSelectedMetricsByType(this.type))
      .pipe(map(featureMetricToChart));

    this.selected$ = this.store.select(
      fromModel.selectFeatureImportanceSelectedByType(this.type)
    );

    this.metrics$ = this.store.select(
      fromModel.selectFeatureImportanceMetricNamesByType(this.type)
    );
  }
}
