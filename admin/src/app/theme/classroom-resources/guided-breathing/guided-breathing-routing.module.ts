import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuidedBreathingListComponent} from "./guided-breathing-list/guided-breathing-list.component";

const routes: Routes = [
    {
        path: '',
        component: GuidedBreathingListComponent,
        data: {
            title: 'Guided Breathing'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidedBreathingRoutingModule { }
