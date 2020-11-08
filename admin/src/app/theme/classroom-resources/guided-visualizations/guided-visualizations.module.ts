import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidedVisualizationsRoutingModule } from './guided-visualizations-routing.module';
import { GuidedVisualizationsListComponent } from './guided-visualizations-list/guided-visualizations-list.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    GuidedVisualizationsRoutingModule,
      SharedModule
  ],
  declarations: [GuidedVisualizationsListComponent]
})
export class GuidedVisualizationsModule { }
