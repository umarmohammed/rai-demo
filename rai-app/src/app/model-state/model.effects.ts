import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  modelSelected,
  featuresLoadedSuccess,
  bootstrapLoadedSuccess,
  bootstrapLoadedWithFairnessSuccess,
} from '../connect-model/connect-model.actions';
import { map, switchMap, withLatestFrom, tap, filter } from 'rxjs/operators';
import { fileToFormData } from '../connect-model/form-data';
import { ModelService } from './model.service';
import { protectedFeatureChanged } from '../core/options/options.actions';
import { Store } from '@ngrx/store';
import * as fromModel from './reducers';

@Injectable()
export class ModelEffects {
  constructor(
    private store: Store<fromModel.State>,
    private actions$: Actions,
    private modelService: ModelService
  ) {}

  loadFeatures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(modelSelected),
      map(fileToFormData),
      switchMap((form) =>
        this.modelService
          .getFeatures(form)
          .pipe(map((features) => featuresLoadedSuccess({ features })))
      )
    )
  );

  loadBootstrap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(modelSelected),
      map(fileToFormData),
      switchMap((form) =>
        this.modelService
          .getBootstrap(form)
          .pipe(map((bootstrap) => bootstrapLoadedSuccess({ bootstrap })))
      )
    )
  );

  loadBootstrapWithFairness$ = createEffect(() =>
    this.actions$.pipe(
      ofType(protectedFeatureChanged),
      filter((features) => !!features.gmin && !!features.gmaj),
      withLatestFrom(this.store.select(fromModel.selectFormData)),
      switchMap(([features, formData]) =>
        this.modelService.getBootstrap(formData, features).pipe(
          map((bootstrap) =>
            bootstrapLoadedWithFairnessSuccess({
              bootstrap,
            })
          )
        )
      )
    )
  );
}
