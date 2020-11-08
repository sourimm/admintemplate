import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OutcomeListComponent} from './outcome-list/outcome-list.component';

const routes: Routes = [
  {
    path: '',
    component: OutcomeListComponent,
    data: {
      title: 'Lesson Outcome'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomeRoutingModule { }
