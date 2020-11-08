import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUnitsComponent} from "./list-units/list-units.component";
import {CreateUnitsComponent} from "./create-units/create-units.component";

const routes: Routes = [
    {
        path: 'list',
        component: ListUnitsComponent,
        pathMatch: 'full',
        data: {
            title: 'Units'
        }
    },
    {
        path: 'add',
        component: CreateUnitsComponent,
        pathMatch: 'full',
        data: {
            title: 'Create Unit'
        }
    },
    {
        path: 'edit/:id',
        component: CreateUnitsComponent,
        pathMatch: 'full',
        data: {
            title: 'Edit Unit'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
