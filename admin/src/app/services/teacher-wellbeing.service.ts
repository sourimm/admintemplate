import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherWellbeingService {

  constructor(private API: ApiService) { }

  getTeacherWellbeingFormData(id) {
    return this.API.post('teacherwellbeing/get_teacherWellbeing_data', {
      'id': id
    });
  }

  submitTeacherWellbeingForm(data) {
    return this.API.post('teacherwellbeing/save_teacherWellbeing', data);
  }

  TeacherWellbeingListing(page_no, page_size, order, order_by, keyword) {
    const data = {
      'page_no': page_no,
      'page_size': page_size,
      'order': order,
      'order_by': order_by,
      'keyword': keyword,
    };
    return this.API.post('teacherwellbeing/teacherWellbeing_listing', data);
  }

  deleteTeacherWellbeing(id) {
    return this.API.post('teacherwellbeing/delete_teacherWellbeing', {
      'id': id
    });
  }
}
