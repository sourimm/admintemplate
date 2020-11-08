import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidedBreathingRoutingModule } from './guided-breathing-routing.module';
import { GuidedBreathingListComponent } from './guided-breathing-list/guided-breathing-list.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    GuidedBreathingRoutingModule,
      SharedModule
  ],
  declarations: [GuidedBreathingListComponent]
})
export class GuidedBreathingModule { }
