import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrintableResourcesCategoriesListComponent} from "./printable-resources-categories-list/printable-resources-categories-list.component";

const routes: Routes = [
    {
        path: '',
        component: PrintableResourcesCategoriesListComponent,
        data: {
            title: 'Printable Resources Categories'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintableResourcesCategoriesRoutingModule { }
