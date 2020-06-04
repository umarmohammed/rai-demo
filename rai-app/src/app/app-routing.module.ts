import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/shell.component';
import { ModelSelectedGuard } from './core/model-selected.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'options',
        loadChildren: () =>
          import('./options/options.module').then((m) => m.OptionsModule),
        canLoad: [ModelSelectedGuard],
      },
      {
        path: '',
        redirectTo: 'options',
        pathMatch: 'full',
      },
    ],
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
