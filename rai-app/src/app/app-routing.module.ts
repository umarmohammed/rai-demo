import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/shell/shell.component';
import { ModelSelectedGuard } from './core/model-selected.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [ModelSelectedGuard],
  },
  {
    path: 'connect',
    loadChildren: () =>
      import('./connect-model/connect-model.module').then(
        (m) => m.ConnectModelModule
      ),
  },
  {
    path: '**',
    redirectTo: 'connect',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
