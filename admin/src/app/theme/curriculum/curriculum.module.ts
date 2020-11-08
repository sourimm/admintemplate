import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumComponent } from './curriculum/curriculum.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    CurriculumRoutingModule,
      SharedModule
  ],
  declarations: [CurriculumComponent]
})
export class CurriculumModule { }
