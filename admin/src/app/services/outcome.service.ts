import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OutcomeService {

  constructor(private API: ApiService) { }

  getFormData(id) {
    return this.API.post('lessonoutcomes/get_form_data', {
      'id': id
    });
  }

  submitFormData(data) {
    return this.API.post('lessonoutcomes/save_data', data);
  }

  getListing(page_no, page_size, order, order_by, keyword) {
    const data = {
      'page_no': page_no,
      'page_size': page_size,
      'order': order,
      'order_by': order_by,
      'keyword': keyword,
    };
    return this.API.post('lessonoutcomes/index', data);
  }

  deleteData(id) {
    return this.API.post('lessonoutcomes/delete_data', {
      'id': id
    });
  }
}
