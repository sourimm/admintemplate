import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListFocusAreasComponent} from "./list-focus-areas/list-focus-areas.component";

const routes: Routes = [
    {
        path: '',
        component: ListFocusAreasComponent,
        pathMatch: 'full',
        data: {
            title: 'Focus Areas'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FocusAreasRoutingModule { }
