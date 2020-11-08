import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LearningareaService {

    constructor(private API: ApiService) { }

    getLearningareaFormData(id) {
        return this.API.post('learningarea/get_learningarea_data', {
            'id': id
        });
    }

    submitLearningareaForm(data) {
        return this.API.post('learningarea/save_learningarea', data);
    }

    LearningareaListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('learningarea/learningarea_listing', data);
    }

    deleteLearningarea(id) {
        return this.API.post('learningarea/delete_learningarea', {
            'id': id
        });
    }
}
