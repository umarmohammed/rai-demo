import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  performaceInstanceSelected,
  fairnessInstanceSelected,
} from './instances-container.actions';
import { Instance } from '../core/models/instance';

@Component({
  selector: 'rai-instances-container',
  template: `
    <div class="container" *ngIf="!(loading$ | async)">
      <rai-instance-explanation
        class="lime-container"
        [instance]="selectedInstance$ | async"
      ></rai-instance-explanation>
      <rai-instances-grid
        [columnNames]="columnNames$ | async"
        [instances]="instances$ | async"
        [selectedRowId]="selectedId$ | async"
        (selectionChanged)="onSelectionChanged($event)"
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
  selectedId$: Observable<string>;
  selectedInstance$: Observable<Instance>;

  constructor(private store: Store<fromModel.State>) {}

  ngOnInit(): void {
    this.instances$ = this.store.select(
      fromModel.selectInstancesByType(this.type)
    );

    this.loading$ = this.store.select(
      fromModel.selectInstancesLoadingByType(this.type)
    );

    this.selectedId$ = this.store.select(
      fromModel.selectInstancesSelectedItemIdByType(this.type)
    );

    this.selectedInstance$ = this.store.select(
      fromModel.selectInstancesSelectedItemByType(this.type)
    );
  }

  onSelectionChanged(id: string) {
    if (this.type === 'performance') {
      this.store.dispatch(
        performaceInstanceSelected({ selectedPerformanceId: id })
      );
    } else {
      this.store.dispatch(fairnessInstanceSelected({ selectedFairnessId: id }));
    }
  }
}
