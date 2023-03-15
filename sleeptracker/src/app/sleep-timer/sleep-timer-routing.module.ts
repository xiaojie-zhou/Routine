import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SleepTimerPage } from './sleep-timer.page';

const routes: Routes = [
  {
    path: '',
    component: SleepTimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepTimerPageRoutingModule {}
