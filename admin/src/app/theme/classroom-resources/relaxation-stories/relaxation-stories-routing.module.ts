import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RelaxationStoriesListComponent} from "./relaxation-stories-list/relaxation-stories-list.component";

const routes: Routes = [
    {
        path: '',
        component: RelaxationStoriesListComponent,
        data: {
            title: 'Relaxation Stories'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelaxationStoriesRoutingModule { }
