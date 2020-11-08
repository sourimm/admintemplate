import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeatherReportListComponent} from './weather-report-list/weather-report-list.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherReportListComponent,
    data: {
      title: 'Weather Report'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherReportRoutingModule { }
