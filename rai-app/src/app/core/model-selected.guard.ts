import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromConnectModel from '../connect-model/store/connect-model.reducer';
import { Store } from '@ngrx/store';
import { tap, map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ModelSelectedGuard implements CanActivate, CanActivateChild {
  file$ = this.store.select(fromConnectModel.selectConnectModelFile);

  constructor(
    private store: Store<fromConnectModel.State>,
    private router: Router
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.file$.pipe(
      tap((file) => (file ? 0 : this.router.navigate(['/connect']))),
      map((file) => !!file),
      take(1)
    );
  }
}
