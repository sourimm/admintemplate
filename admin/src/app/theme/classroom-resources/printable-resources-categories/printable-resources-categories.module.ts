import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintableResourcesCategoriesRoutingModule } from './printable-resources-categories-routing.module';
import { PrintableResourcesCategoriesListComponent } from './printable-resources-categories-list/printable-resources-categories-list.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    PrintableResourcesCategoriesRoutingModule,
      SharedModule
  ],
  declarations: [PrintableResourcesCategoriesListComponent]
})
export class PrintableResourcesCategoriesModule { }
