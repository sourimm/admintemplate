import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

    constructor(private API: ApiService) { }

    getInstructorFormData(id) {
        return this.API.post('instructor/get_instructor_data', {
            'id': id
        });
    }

    getSchoolsDropdown() {
        return this.API.post('instructor/get_schools_dropdown');
    }

    submitInstructorForm(data) {
        return this.API.post('instructor/save_instructor', data);
    }

    submitInstructorCourseForm(data) {
        return this.API.post('instructor/save_instructor_courses', data);
    }

    InstructorListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('instructor/instructor_listing', data);
    }

    InstructorRequestListing(page_no, page_size, order, order_by, keyword, instructor_id, enroll_status) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
            'instructor_id': instructor_id,
            'enroll_status': enroll_status,
        };
        return this.API.post('request/pendingEnrol', data);
    }

    deleteInstructor(id) {
        return this.API.post('instructor/delete_instructor', {
            'id': id
        });
    }
	
	getInstructorSchoolWise(data) {
		//console.log('data'+data['id'])
       return this.API.post('instructor/get_InstructorSchoolWise', {
            'id': data["id"], 
            'teacher_count': data["teacher_count"]
        });
    }
	
}
