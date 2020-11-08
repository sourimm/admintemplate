import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FocusAreasRoutingModule } from './focus-areas-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { ListFocusAreasComponent } from './list-focus-areas/list-focus-areas.component';

@NgModule({
  imports: [
    CommonModule,
    FocusAreasRoutingModule,
    SharedModule
  ],
  declarations: [ListFocusAreasComponent]
})
export class FocusAreasModule { }
