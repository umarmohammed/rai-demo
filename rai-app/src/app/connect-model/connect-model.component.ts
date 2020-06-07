import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../model-state/reducers';
import { modelSelected } from './connect-model.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'rai-connect-model',
  template: ` <div class="container">
    <img class="logo" src="/assets/logo.PNG" />
    <div class="text-container">
      <h1 class="title">Robustness Demo</h1>
      <button
        (click)="fileInput.click()"
        color="primary"
        mat-stroked-button
        class="upload-button"
      >
        Connect
      </button>
      <input
        hidden
        type="file"
        #fileInput
        type="file"
        (change)="fileUploaded(fileInput.files[0])"
        accept=".joblib"
      />
    </div>
  </div>`,
  styleUrls: ['connect-model.component.scss'],
})
export class ConnectModelComponent {
  constructor(private store: Store<State>, private router: Router) {}

  fileUploaded(file: File) {
    this.store.dispatch(modelSelected({ file }));
    this.router.navigate(['/overview']);
  }
}
