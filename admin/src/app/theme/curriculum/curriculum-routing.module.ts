import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurriculumComponent} from "./curriculum/curriculum.component";

const routes: Routes = [
    {
        path: '',
        component: CurriculumComponent,
        pathMatch: 'full',
        data: {
            title: 'Curriculum Map'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }
