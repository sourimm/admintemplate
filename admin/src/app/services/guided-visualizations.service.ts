import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class GuidedVisualizationsService {

    constructor(private API: ApiService) { }

    getGuidedVisualizationsFormData(id) {
        return this.API.post('guidedvisualizations/get_guidedvisualizations_data', {
            'id': id
        });
    }

    submitGuidedVisualizationsForm(data) {
        return this.API.post('guidedvisualizations/save_guidedvisualizations', data);
    }

    GuidedVisualizationsListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('guidedvisualizations/guidedvisualizations_listing', data);
    }

    deleteGuidedVisualizations(id) {
        return this.API.post('guidedvisualizations/delete_guidedvisualizations', {
            'id': id
        });
    }

    getGradesDropdown() {
        return this.API.post('gradepairs/getGradesDropdown');
    }
}
