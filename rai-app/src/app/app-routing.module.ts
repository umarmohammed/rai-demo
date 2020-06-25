import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/shell/shell.component';
import { ModelSelectedGuard } from './core/model-selected.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [ModelSelectedGuard],
    canActivateChild: [ModelSelectedGuard],
    children: [
      {
        path: 'overview',
        loadChildren: () =>
          import('./overview/overview.module').then((m) => m.OverviewModule),
      },
      {
        path: 'instances',
        loadChildren: () =>
          import('./instances/instances.module').then((m) => m.InstancesModule),
      },
      {
        path: 'features',
        loadChildren: () =>
          import('./features/features.module').then((m) => m.FeaturesModule),
      },
      {
        path: 'adversarial',
        loadChildren: () =>
          import('./adversarial/adversarial.module').then(
            (m) => m.AdversarialModule
          ),
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
    redirectTo: '/connect',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
