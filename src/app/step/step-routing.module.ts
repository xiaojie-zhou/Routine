import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepPage } from './step.page';

const routes: Routes = [
  {
    path: '',
    component: StepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepPageRoutingModule {}
