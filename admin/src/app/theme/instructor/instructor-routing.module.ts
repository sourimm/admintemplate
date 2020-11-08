import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstructorListComponent} from "./instructor-list/instructor-list.component";
import {InstructorCreateComponent} from "./instructor-create/instructor-create.component";

const routes: Routes = [
    {
        path: 'list',
        component: InstructorListComponent,
        data: {
            title: 'Instructors'
        }
    },
    {
        path: 'add',
        component: InstructorCreateComponent,
        data: {
            title: 'Add Instructor'
        }
    },
    {
        path: 'edit/:id',
        component: InstructorCreateComponent,
        data: {
            title: 'Edit Instructor'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
