import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModel from '../model-state/reducers';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WindowService {
  protectedFeaturesSet$ = this.store
    .select(fromModel.selectProtectedFeaturesSet)
    .pipe(tap(this.triggerWindowChangeForCharts));

  constructor(private store: Store<fromModel.State>) {}

  triggerWindowChangeForCharts() {
    window.dispatchEvent(new Event('resize'));
  }
}
