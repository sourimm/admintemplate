import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherWellbeingRoutingModule } from './teacher-wellbeing-routing.module';
import { TeacherWellbeingListComponent } from './teacher-wellbeing-list/teacher-wellbeing-list.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TeacherWellbeingRoutingModule,
    SharedModule,
  ],
  declarations: [TeacherWellbeingListComponent]
})
export class TeacherWellbeingModule { }
