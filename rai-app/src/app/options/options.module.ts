import { NgModule } from '@angular/core';
import { OptionsComponent } from './options.component';
import { MaterialModule } from '../material/material.module';
import { SelectProtectedFeatureComponent } from './select-protected-feature.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: OptionsComponent }];

@NgModule({
  declarations: [OptionsComponent, SelectProtectedFeatureComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class OptionsModule {}
