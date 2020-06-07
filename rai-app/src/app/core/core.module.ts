import { NgModule } from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options/options.component';
import { SelectProtectedFeatureComponent } from './options/select-protected-feature.component';

@NgModule({
  declarations: [
    ShellComponent,
    OptionsComponent,
    SelectProtectedFeatureComponent,
  ],
  imports: [MaterialModule, RouterModule, CommonModule],
})
export class CoreModule {}
