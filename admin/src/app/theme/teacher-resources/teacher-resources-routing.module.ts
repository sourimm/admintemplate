import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'teacher-wellbeing',
    loadChildren: './teacher-wellbeing/teacher-wellbeing.module#TeacherWellbeingModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherResourcesRoutingModule { }
