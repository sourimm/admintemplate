import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningAreasRoutingModule } from './learning-areas-routing.module';
import { ListLearningAreasComponent } from './list-learning-areas/list-learning-areas.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    LearningAreasRoutingModule,
    SharedModule
  ],
  declarations: [ListLearningAreasComponent]
})
export class LearningAreasModule { }
