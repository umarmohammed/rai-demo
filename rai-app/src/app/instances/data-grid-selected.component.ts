import { Directive, Input, OnDestroy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[raiSelected]',
})
export class DataGridSelectedDirective implements OnDestroy {
  private destroySubject = new Subject();

  @Input('raiSelected') selectedRow: number;

  constructor(grid: AgGridAngular) {
    grid.gridReady.pipe(takeUntil(this.destroySubject)).subscribe(() => {
      grid.gridOptions.api.forEachNode((node) =>
        node.data.id === this.selectedRow ? node.setSelected(true) : 0
      );
    });
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
  }
}
