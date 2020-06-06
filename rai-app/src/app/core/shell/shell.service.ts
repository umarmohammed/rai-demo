import { Injectable } from '@angular/core';
import * as fromOptions from '../../options/options.reducer';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShellService {
  groupNames$ = combineLatest([
    this.store.select(fromOptions.selectOptionsGmin),
    this.store.select(fromOptions.selectOptionsGmaj),
  ]).pipe(filter(([gmin, gmaj]) => !!gmin && !!gmaj));

  constructor(private store: Store<fromOptions.State>) {}
}
