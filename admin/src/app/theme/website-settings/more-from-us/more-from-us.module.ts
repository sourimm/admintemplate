import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreFromUsRoutingModule } from './more-from-us-routing.module';
import { MoreFromUsMainComponent } from './more-from-us-main/more-from-us-main.component';
import { MoreFromUsBannersComponent } from './more-from-us-banners/more-from-us-banners.component';
import { MoreFromUsSectionsComponent } from './more-from-us-sections/more-from-us-sections.component';
import {SharedModule} from "../../../shared/shared.module";
import { MoreFromUsSection1Component } from './more-from-us-sections/more-from-us-section1/more-from-us-section1.component';
import { MoreFromUsSection2Component } from './more-from-us-sections/more-from-us-section2/more-from-us-section2.component';
import { MoreFromUsSection3Component } from './more-from-us-sections/more-from-us-section3/more-from-us-section3.component';
import {DragulaModule} from "ng2-dragula";

@NgModule({
  imports: [
    CommonModule,
    MoreFromUsRoutingModule,
      SharedModule,
      DragulaModule,
  ],
  declarations: [MoreFromUsMainComponent, MoreFromUsBannersComponent, MoreFromUsSectionsComponent, MoreFromUsSection1Component, MoreFromUsSection2Component, MoreFromUsSection3Component]
})
export class MoreFromUsModule { }
