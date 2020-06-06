import { NgModule } from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ShellTitleComponent } from './shell/shell-title.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ShellComponent, ShellTitleComponent],
  imports: [MaterialModule, RouterModule, CommonModule],
})
export class CoreModule {}
