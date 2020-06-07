import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import {
  modelSelected,
  featuresLoadedSuccess,
} from '../connect-model/connect-model.actions';
import { map, switchMap } from 'rxjs/operators';
import { fileToFormData } from '../connect-model/form-data';
import { ModelService } from './model.service';

@Injectable()
export class FeaturesEffects {
  constructor(private actions$: Actions, private modelService: ModelService) {}

  loadFeatures$ = this.actions$.pipe(
    ofType(modelSelected),
    map(fileToFormData),
    switchMap((form) =>
      this.modelService
        .getFeatures(form)
        .pipe(map((features) => featuresLoadedSuccess({ features })))
    )
  );
}
