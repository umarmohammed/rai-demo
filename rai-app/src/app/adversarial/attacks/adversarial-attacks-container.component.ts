import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Adversarials } from 'src/app/core/models/attack-response';
import { Store } from '@ngrx/store';
import * as fromModel from '../../model-state/reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rai-adversarial-attacks-container',
  template: `<div class="container" *ngIf="!loading">
      <rai-adversarial-attacks-explanation
        class="lime-container"
      ></rai-adversarial-attacks-explanation>
      <rai-adversarial-attacks-grid
        [columnNames]="columnNames$ | async"
        [adversarials]="adversarials$ | async"
      ></rai-adversarial-attacks-grid>
    </div>
    <!-- TODO create a wrapper component for this pattern -->
    <mat-spinner class="spinner" [class.show]="loading"></mat-spinner>`,
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
      }
    `,
  ],
})
export class AdversarialAttacksContainerComponent implements OnInit {
  @Input() type: string;
  @Input() loading: string;

  adversarials$: Observable<Adversarials>;
  columnNames$: Observable<any[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.adversarials$ = this.store.select(
      fromModel.selectAttackItemsByType(this.type)
    );

    this.columnNames$ = this.store
      .select(fromModel.selectAttackStateColumnNames)
      .pipe(
        map((columnNames) =>
          columnNames.map((c) => ({ headerName: c, field: c }))
        )
      );
  }
}
