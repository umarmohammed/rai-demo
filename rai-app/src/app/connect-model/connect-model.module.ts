import { NgModule } from '@angular/core';
import { ConnectModelComponent } from './connect-model.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ConnectModelComponent,
  },
];

@NgModule({
  declarations: [ConnectModelComponent],
  imports: [RouterModule.forChild(routes)],
})
export class ConnectModelModule {}
