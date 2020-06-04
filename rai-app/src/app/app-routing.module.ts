import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'connect',
    loadChildren: () =>
      import('./connect-model/connect-model.module').then(
        (m) => m.ConnectModelModule
      ),
  },
  {
    path: 'options',
    loadChildren: () =>
      import('./options/options.module').then((m) => m.OptionsModule),
  },
  { path: '', redirectTo: 'connect', pathMatch: 'full' },
  { path: '**', redirectTo: 'connect' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
