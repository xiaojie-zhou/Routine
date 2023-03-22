import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepPageRoutingModule } from './step-routing.module';

import { StepPage } from './step.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StepPageRoutingModule
    ],
    exports: [
        StepPage
    ],
    declarations: [StepPage]
})
export class StepPageModule {}
