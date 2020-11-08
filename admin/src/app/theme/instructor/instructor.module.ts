import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { InstructorCreateComponent } from './instructor-create/instructor-create.component';

@NgModule({
  imports: [
    CommonModule,
    InstructorRoutingModule,
      SharedModule
  ],
  declarations: [InstructorListComponent, InstructorCreateComponent]
})
export class InstructorModule { }
