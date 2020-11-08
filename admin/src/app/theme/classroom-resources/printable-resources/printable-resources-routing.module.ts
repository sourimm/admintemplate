import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrintableResourcesListComponent} from "./printable-resources-list/printable-resources-list.component";

const routes: Routes = [
    {
        path: '',
        component: PrintableResourcesListComponent,
        data: {
            title: 'Printable Resources'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintableResourcesRoutingModule { }
