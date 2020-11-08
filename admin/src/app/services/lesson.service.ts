import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LessonService {

    constructor(private API: ApiService) { }

    getLessonFormData(id) {
        return this.API.post('lesson/get_lesson_data', {
            'id': id
        });
    }

    submitLessonForm(data) {
        return this.API.post('lesson/save_lesson', data);
    }

    LessonListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('lesson/lesson_listing', data);
    }

    deleteLesson(id) {
        return this.API.post('lesson/delete_lesson', {
            'id': id
        });
    }

    getLearningAreasDropdown() {
        return this.API.post('learningarea/getLearningAreasDropdown');
    }

    getGradesDropdown() {
        return this.API.post('lesson/getGradesDropdown');
    }
}
