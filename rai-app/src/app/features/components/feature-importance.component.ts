import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Chart, orangeScheme } from '../../core/models/chart';
import { MatSelectChange } from '@angular/material/select';
import { FeatureImportanceService } from '../feature-importance.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rai-feature-importance',
  template: `
    <div class="container">
      <mat-form-field>
        <mat-label>Metric</mat-label>
        <mat-select
          [value]="selectedMetricName$ | async"
          (selectionChange)="onSelectionChange($event)"
        >
          <mat-option
            *ngFor="let metric of metricNames$ | async"
            [value]="metric"
          >
            {{ metric }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <div class="chart-container">
        <ngx-charts-bar-horizontal
          [results]="(chart$ | async).series"
          [xAxis]="true"
          [yAxis]="true"
          [scheme]="orangeScheme"
          [roundEdges]="false"
          [showDataLabel]="true"
          [maxYAxisTickLength]="30"
          [xScaleMin]="xScaleMin$ | async"
        >
        </ngx-charts-bar-horizontal>
      </div>
    </div>
  `,
  styleUrls: ['feature-importance.component.scss'],
})
export class FeatureImportanceComponent implements OnInit {
  @Input() axis: string;
  @Output() selectionChange = new EventEmitter<number>();

  orangeScheme = orangeScheme;

  metricNames$ = this.featureImportanceService.metricNames$;
  selectedMetricName$: Observable<string>;
  chart$: Observable<Chart>;
  xScaleMin$: Observable<number>;

  constructor(private featureImportanceService: FeatureImportanceService) {}

  ngOnInit(): void {
    const {
      selectedMetricName$,
      chart$,
      chartXScaleMin$,
    } = this.featureImportanceService.getStuffForAxis(this.axis);

    this.selectedMetricName$ = selectedMetricName$;
    this.chart$ = chart$;
    this.xScaleMin$ = chartXScaleMin$;
  }

  onSelectionChange(event: MatSelectChange) {
    this.selectionChange.emit(
      event.source.options
        .map((o) => o.value)
        .findIndex((v) => v === event.value)
    );
  }
}
