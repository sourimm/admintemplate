import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MindfulExercisesListComponent} from "./mindful-exercises-list/mindful-exercises-list.component";

const routes: Routes = [
    {
        path: '',
        component: MindfulExercisesListComponent,
        data: {
            title: 'Mindful Exercises'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MindfulExercisesRoutingModule { }
