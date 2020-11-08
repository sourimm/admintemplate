import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitsRoutingModule } from './units-routing.module';
import { ListUnitsComponent } from './list-units/list-units.component';
import {SharedModule} from "../../shared/shared.module";
import { CreateUnitsComponent } from './create-units/create-units.component';

@NgModule({
  imports: [
    CommonModule,
    UnitsRoutingModule,
    SharedModule
  ],
  declarations: [ListUnitsComponent, CreateUnitsComponent]
})
export class UnitsModule { }
