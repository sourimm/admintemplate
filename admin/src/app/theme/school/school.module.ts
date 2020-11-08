import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolCreateComponent } from './school-create/school-create.component';
import { SchoolListComponent } from './school-list/school-list.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SchoolRoutingModule,
      SharedModule
  ],
  declarations: [SchoolCreateComponent, SchoolListComponent]
})
export class SchoolModule { }
