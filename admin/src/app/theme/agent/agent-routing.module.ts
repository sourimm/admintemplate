import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgentListComponent} from './agent-list/agent-list.component';
import {AgentCreateComponent} from './agent-create/agent-create.component';

const routes: Routes = [
  {
    path: 'list',
    component: AgentListComponent,
    data: {
      title: 'Agents'
    }
  },
  {
    path: 'add',
    component: AgentCreateComponent,
    data: {
      title: 'Add Agent'
    }
  },
  {
    path: 'edit/:id',
    component: AgentCreateComponent,
    data: {
      title: 'Edit Agent'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
