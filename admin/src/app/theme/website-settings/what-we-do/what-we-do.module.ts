import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatWeDoRoutingModule } from './what-we-do-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import {DragulaModule} from "ng2-dragula";
import { WhatWeDoMainComponent } from './what-we-do-main/what-we-do-main.component';
import { WhatWeDoBannersComponent } from './what-we-do-banners/what-we-do-banners.component';
import { WhatWeDoSectionsComponent } from './what-we-do-sections/what-we-do-sections.component';
import { WhatWeDoSection1Component } from './what-we-do-sections/what-we-do-section1/what-we-do-section1.component';
import { WhatWeDoSection2Component } from './what-we-do-sections/what-we-do-section2/what-we-do-section2.component';
import { WhatWeDoSection3Component } from './what-we-do-sections/what-we-do-section3/what-we-do-section3.component';
import { WhatWeDoSection4Component } from './what-we-do-sections/what-we-do-section4/what-we-do-section4.component';
import {ColorPickerModule} from "ngx-color-picker";
import { OurCharactersComponent } from './our-characters/our-characters.component';

@NgModule({
  imports: [
    CommonModule,
    WhatWeDoRoutingModule,
      SharedModule,
      DragulaModule,
      ColorPickerModule
  ],
  declarations: [WhatWeDoMainComponent, WhatWeDoBannersComponent, WhatWeDoSectionsComponent, WhatWeDoSection1Component, WhatWeDoSection2Component, WhatWeDoSection3Component, WhatWeDoSection4Component, OurCharactersComponent]
})
export class WhatWeDoModule { }
