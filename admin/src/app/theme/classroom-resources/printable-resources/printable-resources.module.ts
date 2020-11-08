import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintableResourcesRoutingModule } from './printable-resources-routing.module';
import { PrintableResourcesListComponent } from './printable-resources-list/printable-resources-list.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    PrintableResourcesRoutingModule,
      SharedModule
  ],
  declarations: [PrintableResourcesListComponent]
})
export class PrintableResourcesModule { }
