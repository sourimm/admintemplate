import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherReportRoutingModule } from './weather-report-routing.module';
import { WeatherReportListComponent } from './weather-report-list/weather-report-list.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    WeatherReportRoutingModule,
    SharedModule,
  ],
  declarations: [WeatherReportListComponent]
})
export class WeatherReportModule { }
