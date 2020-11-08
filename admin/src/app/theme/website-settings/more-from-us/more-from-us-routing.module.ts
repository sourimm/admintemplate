import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoreFromUsMainComponent} from "./more-from-us-main/more-from-us-main.component";

const routes: Routes = [
    {
        path: '',
        component: MoreFromUsMainComponent,
        data: {
            title: 'More From Us'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreFromUsRoutingModule { }
