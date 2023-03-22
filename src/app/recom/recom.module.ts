import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomPageRoutingModule } from './recom-routing.module';

import { RecomPage } from './recom.page';
import {StepPageModule} from "../step/step.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RecomPageRoutingModule,
        StepPageModule
    ],
  declarations: [RecomPage]
})
export class RecomPageModule {}
