import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class EducationFrameworkService {

    constructor(private API: ApiService) { }

    getFrameworkFormData(id) {
        return this.API.post('frameworks/get_framework_data', {
            'id': id
        });
    }

    submitFrameworkForm(data) {
        return this.API.post('frameworks/save_framework', data);
    }

    submitFrameworkOrderForm(data) {
        return this.API.post('frameworks/save_order', data);
    }

    FrameworkListing(parent_id) {
        return this.API.post('frameworks/framework_listing', {parent_id: parent_id});
    }

    deleteFramework(id) {
        return this.API.post('frameworks/delete_framework', {
            'id': id
        });
    }
}
