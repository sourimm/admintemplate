import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrainBreaksListComponent} from "./brain-breaks-list/brain-breaks-list.component";

const routes: Routes = [
    {
        path: '',
        component: BrainBreaksListComponent,
        data: {
            title: 'Brain Breaks'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrainBreaksRoutingModule { }
