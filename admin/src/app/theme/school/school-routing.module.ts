import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SchoolListComponent} from "./school-list/school-list.component";
import {SchoolCreateComponent} from "./school-create/school-create.component";

const routes: Routes = [
    {
        path: 'list',
        component: SchoolListComponent,
        data: {
            title: 'Schools'
        }
    },
    {
        path: 'add',
        component: SchoolCreateComponent,
        data: {
            title: 'Add School'
        }
    },
    {
        path: 'edit/:id',
        component: SchoolCreateComponent,
        data: {
            title: 'Edit School'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
