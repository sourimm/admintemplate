import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

    constructor(private API: ApiService) { }

    getCurriculumFormData(id) {
        return this.API.post('curriculum/get_curriculum_data', {
            'id': id
        });
    }

    submitCurriculumForm(data) {
        return this.API.post('curriculum/save_curriculum', data);
    }

    CurriculumListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('curriculum/curriculum_listing', data);
    }

    deleteCurriculum(id) {
        return this.API.post('curriculum/delete_curriculum', {
            'id': id
        });
    }
}
