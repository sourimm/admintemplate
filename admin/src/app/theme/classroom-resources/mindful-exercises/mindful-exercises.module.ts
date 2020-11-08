import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MindfulExercisesRoutingModule } from './mindful-exercises-routing.module';
import { MindfulExercisesListComponent } from './mindful-exercises-list/mindful-exercises-list.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    MindfulExercisesRoutingModule,
      SharedModule
  ],
  declarations: [MindfulExercisesListComponent]
})
export class MindfulExercisesModule { }
