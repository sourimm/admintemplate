import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class BrainBreaksService {

    constructor(private API: ApiService) { }

    getBrainBreaksFormData(id) {
        return this.API.post('brainbreaks/get_brainbreaks_data', {
            'id': id
        });
    }

    submitBrainBreaksForm(data) {
        return this.API.post('brainbreaks/save_brainbreaks', data);
    }

    BrainBreaksListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('brainbreaks/brainbreaks_listing', data);
    }

    deleteBrainBreaks(id) {
        return this.API.post('brainbreaks/delete_brainbreaks', {
            'id': id
        });
    }

    getGradesDropdown() {
        return this.API.post('gradepairs/getGradesDropdown');
    }
}
