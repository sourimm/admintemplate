import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { CreateLessonsComponent } from './create-lessons/create-lessons.component';
import { ListLessonsComponent } from './list-lessons/list-lessons.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    LessonsRoutingModule,
    SharedModule
  ],
  declarations: [CreateLessonsComponent, ListLessonsComponent]
})
export class LessonsModule { }
