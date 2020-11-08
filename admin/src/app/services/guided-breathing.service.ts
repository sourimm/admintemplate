import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class GuidedBreathingService {

    constructor(private API: ApiService) { }

    getGuidedBreathingFormData(id) {
        return this.API.post('guidedbreathing/get_guidedbreathing_data', {
            'id': id
        });
    }

    submitGuidedBreathingForm(data) {
        return this.API.post('guidedbreathing/save_guidedbreathing', data);
    }

    GuidedBreathingListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('guidedbreathing/guidedbreathing_listing', data);
    }

    deleteGuidedBreathing(id) {
        return this.API.post('guidedbreathing/delete_guidedbreathing', {
            'id': id
        });
    }

    getGradesDropdown() {
        return this.API.post('gradepairs/getGradesDropdown');
    }
}
