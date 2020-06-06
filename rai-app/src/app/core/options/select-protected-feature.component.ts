import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'rai-select-protected-feaure',
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <mat-select (selectionChange)="onSelectionChange($event)" [value]="value">
        <mat-option *ngFor="let feature of features" [value]="feature">
          {{ feature }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectProtectedFeatureComponent {
  @Input() label: string;
  @Input() features: string[];
  @Input() value: string;

  @Output() selectionChange = new EventEmitter<string>();

  onSelectionChange(matSelectChange: MatSelectChange) {
    this.selectionChange.emit(matSelectChange.value);
  }
}
