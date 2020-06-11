import { NgModule } from '@angular/core';
import { DataGridSelectedDirective } from './data-grid-selected.component';

@NgModule({
  declarations: [DataGridSelectedDirective],
  exports: [DataGridSelectedDirective],
})
export class SharedModule {}
