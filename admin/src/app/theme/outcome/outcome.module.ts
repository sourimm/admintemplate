import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutcomeRoutingModule } from './outcome-routing.module';
import { OutcomeListComponent } from './outcome-list/outcome-list.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OutcomeRoutingModule,
    SharedModule,
  ],
  declarations: [OutcomeListComponent]
})
export class OutcomeModule { }
