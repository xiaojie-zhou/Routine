import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomPage } from './recom.page';

const routes: Routes = [
  {
    path: '',
    component: RecomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomPageRoutingModule {}
