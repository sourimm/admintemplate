import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeMainComponent} from "./home-main/home-main.component";

const routes: Routes = [
    {
        path: '',
        component: HomeMainComponent,
        data: {
            title: 'Home'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
