import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rai-instances-container',
  template: `
    <div class="container" *ngIf="!(loading$ | async)">
      <div class="lime-container">Lime Analysis</div>
      <rai-instances-grid
        [columnNames]="columnNames$ | async"
        [instances]="instances$ | async"
      ></rai-instances-grid>
    </div>
    <!-- TODO create a wrapper component for this pattern -->
    <mat-spinner class="spinner" [class.show]="loading$ | async"></mat-spinner>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }

      .container {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .lime-container {
        height: 35%;
        display: grid;
        align-content: center;
        justify-content: center;
      }
    `,
  ],
})
export class InstancesContainerComponent implements OnInit {
  @Input() type: string;

  // TODO: move to service
  columnNames$ = this.store
    .select(fromModel.selectInstancesColumnNames)
    .pipe(
      map((columnNames) =>
        columnNames.map((c) => ({ headerName: c, field: c }))
      )
    );
  instances$: Observable<any[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromModel.State>) {}

  ngOnInit(): void {
    this.instances$ = this.store.select(
      fromModel.selectInstancesByType(this.type)
    );

    this.loading$ = this.store.select(
      fromModel.selectInstancesLoadingByType(this.type)
    );
  }
}
