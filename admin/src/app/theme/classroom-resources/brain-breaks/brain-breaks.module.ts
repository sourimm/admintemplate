import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrainBreaksRoutingModule } from './brain-breaks-routing.module';
import { BrainBreaksListComponent } from './brain-breaks-list/brain-breaks-list.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    BrainBreaksRoutingModule,
      SharedModule
  ],
  declarations: [BrainBreaksListComponent]
})
export class BrainBreaksModule { }
