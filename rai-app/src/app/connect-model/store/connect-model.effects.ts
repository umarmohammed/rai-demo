import { createEffect, Actions, ofType } from '@ngrx/effects';
import { modelSelected, featuresLoadedSuccess } from '../connect-model.actions';
import { ConnectModelService } from '../connect-model.service';
import { switchMap, map } from 'rxjs/operators';
import { fileToFormData } from '../form-data';
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectModelEffects {
  constructor(
    private actions$: Actions,
    private connectModelService: ConnectModelService
  ) {}

  loadFeatures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(modelSelected),
      map(fileToFormData),
      switchMap((formData) =>
        this.connectModelService
          .getFeatures(formData)
          .pipe(map((features) => featuresLoadedSuccess({ features })))
      )
    )
  );
}
