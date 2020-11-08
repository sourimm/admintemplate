import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherWellbeingListComponent} from './teacher-wellbeing-list/teacher-wellbeing-list.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherWellbeingListComponent,
    data: {
      title: 'Teacher Wellbeing'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherWellbeingRoutingModule { }
