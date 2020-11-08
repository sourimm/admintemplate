import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelaxationStoriesRoutingModule } from './relaxation-stories-routing.module';
import { RelaxationStoriesListComponent } from './relaxation-stories-list/relaxation-stories-list.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RelaxationStoriesRoutingModule,
      SharedModule
  ],
  declarations: [RelaxationStoriesListComponent]
})
export class RelaxationStoriesModule { }
