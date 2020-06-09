import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rai-instances-container',
  template: `
    <div>Lime Analysis</div>
    <rai-instances-grid
      [columnNames]="columnNames$ | async"
      [instances]="instances$ | async"
    ></rai-instances-grid>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }
    `,
  ],
})
export class InstancesContainerComponent implements OnInit {
  @Input() type: string;

  columnNames$ = this.store
    .select(fromModel.selectInstancesColumnNames)
    .pipe(
      map((columnNames) =>
        columnNames.map((c) => ({ headerName: c, field: c }))
      )
    );
  instances$: Observable<any[]>;

  constructor(private store: Store<fromModel.State>) {}

  ngOnInit(): void {
    this.instances$ = this.store.select(
      fromModel.selectInstancesByType(this.type)
    );
  }
}
