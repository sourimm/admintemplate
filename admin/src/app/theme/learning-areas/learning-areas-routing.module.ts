import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListLearningAreasComponent} from "./list-learning-areas/list-learning-areas.component";

const routes: Routes = [
    {
        path: '',
        component: ListLearningAreasComponent,
        pathMatch: 'full',
        data: {
            title: 'Learning Areas'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningAreasRoutingModule { }
