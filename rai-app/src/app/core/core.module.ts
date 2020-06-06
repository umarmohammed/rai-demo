import { NgModule } from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options/options.component';
import { SelectProtectedFeatureComponent } from './options/select-protected-feature.component';
import { StoreModule } from '@ngrx/store';
import { optionsFetureKey, reducer } from './options/options.reducer';

@NgModule({
  declarations: [
    ShellComponent,
    OptionsComponent,
    SelectProtectedFeatureComponent,
  ],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    StoreModule.forFeature(optionsFetureKey, reducer),
  ],
})
export class CoreModule {}
