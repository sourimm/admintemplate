import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListLessonsComponent} from "./list-lessons/list-lessons.component";
import {CreateLessonsComponent} from "./create-lessons/create-lessons.component";

const routes: Routes = [
    {
        path: 'list',
        component: ListLessonsComponent,
        pathMatch: 'full',
        data: {
            title: 'Lessons'
        }
    },
    {
        path: 'add',
        component: CreateLessonsComponent,
        pathMatch: 'full',
        data: {
            title: 'Create Lesson'
        }
    },
    {
        path: 'edit/:id',
        component: CreateLessonsComponent,
        pathMatch: 'full',
        data: {
            title: 'Edit Lesson'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
