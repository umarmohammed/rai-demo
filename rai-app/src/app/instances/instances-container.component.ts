import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'rai-instances-container',
  template: `<div>
    <p>{{ type }}</p>
    <div>Lime Analysis</div>
    <rai-instances-grid
      [columnNames]="columnNames$ | async"
      [instances]="instances$ | async"
    ></rai-instances-grid>
  </div>`,
})
export class InstancesContainerComponent implements OnInit {
  @Input() type: string;

  columnNames$ = this.store.select(fromModel.selectInstancesColumnNames);
  instances$: Observable<any[]>;

  constructor(private store: Store<fromModel.State>) {}

  ngOnInit(): void {
    this.instances$ = this.store.select(
      fromModel.selectInstancesByType(this.type)
    );
  }
}
