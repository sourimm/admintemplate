import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListFilesComponent} from "./list-files/list-files.component";

const routes: Routes = [
    {
        path: '',
        component: ListFilesComponent,
        pathMatch: 'full',
        data: {
            title: 'Files'
        }
    },
    {
        path: ':id',
        component: ListFilesComponent,
        pathMatch: 'full',
        data: {
            title: 'Files'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { }
