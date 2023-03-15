import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SleepTimerPageRoutingModule } from './sleep-timer-routing.module';

import { SleepTimerPage } from './sleep-timer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SleepTimerPageRoutingModule
  ],
  declarations: [SleepTimerPage]
})
export class SleepTimerPageModule {}
