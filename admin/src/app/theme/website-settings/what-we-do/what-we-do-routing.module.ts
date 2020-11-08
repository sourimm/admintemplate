import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WhatWeDoMainComponent} from "./what-we-do-main/what-we-do-main.component";

const routes: Routes = [
    {
        path: '',
        component: WhatWeDoMainComponent,
        data: {
            title: 'What We Do'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatWeDoRoutingModule { }
