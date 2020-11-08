import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentCreateComponent } from './agent-create/agent-create.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AgentRoutingModule,
    SharedModule,
  ],
  declarations: [AgentCreateComponent, AgentListComponent]
})
export class AgentModule { }
