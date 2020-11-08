import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuidedVisualizationsListComponent} from "./guided-visualizations-list/guided-visualizations-list.component";

const routes: Routes = [
    {
        path: '',
        component: GuidedVisualizationsListComponent,
        data: {
            title: 'Guided Visualizations'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidedVisualizationsRoutingModule { }
