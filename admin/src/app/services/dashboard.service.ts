import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class DashboardService {

  constructor(private API: ApiService) { }

  getDashboardStats() {
    return this.API.post('dashboard/stats');
  }

  getDashboardCourses() {
      return this.API.post('dashboard/course_listing');
  }
}
