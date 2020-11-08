import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import {DragulaModule} from "ng2-dragula";
import { HomeMainComponent } from './home-main/home-main.component';
import { HomeBannersComponent } from './home-banners/home-banners.component';
import { HomeSectionsComponent } from './home-sections/home-sections.component';
import { HomeSection1Component } from './home-sections/home-section1/home-section1.component';
import { HomeSection2Component } from './home-sections/home-section2/home-section2.component';
import { HomeSection3Component } from './home-sections/home-section3/home-section3.component';
import { HomeSection4Component } from './home-sections/home-section4/home-section4.component';
import { HomeFrameworksComponent } from './home-frameworks/home-frameworks.component';
import { HomeSubFrameworksComponent } from './home-frameworks/home-sub-frameworks/home-sub-frameworks.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
      SharedModule,
      DragulaModule,
  ],
  declarations: [HomeMainComponent, HomeBannersComponent, HomeSectionsComponent, HomeSection1Component, HomeSection2Component, HomeSection3Component, HomeSection4Component, HomeFrameworksComponent, HomeSubFrameworksComponent]
})
export class HomeModule { }
