import { Component } from '@angular/core';

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
  fileUploaded(file: File) {
    console.log(file);
  }
}
