import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

    constructor(private API: ApiService) { }

    getInstructorFormData(id) {
        return this.API.post('school/get_instructor_data', {
            'id': id
        });
    }

    submitInstructorForm(data) {
        return this.API.post('school/save_instructor', data);
    }

    submitInstructorCourseForm(data) {
        return this.API.post('school/save_instructor_courses', data);
    }

    InstructorListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('school/instructor_listing', data);
    }

    deleteInstructor(id) {
        return this.API.post('school/delete_instructor', {
            'id': id
        });
    }
}
