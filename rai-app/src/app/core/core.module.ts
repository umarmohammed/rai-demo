import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShellComponent],
  imports: [MaterialModule, RouterModule],
})
export class CoreModule {}
