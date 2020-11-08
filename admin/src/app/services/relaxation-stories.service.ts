import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class RelaxationStoriesService {

    constructor(private API: ApiService) { }

    getRelaxationStoriesFormData(id) {
        return this.API.post('relaxationstories/get_relaxationstories_data', {
            'id': id
        });
    }

    submitRelaxationStoriesForm(data) {
        return this.API.post('relaxationstories/save_relaxationstories', data);
    }

    RelaxationStoriesListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('relaxationstories/relaxationstories_listing', data);
    }

    deleteRelaxationStories(id) {
        return this.API.post('relaxationstories/delete_relaxationstories', {
            'id': id
        });
    }

    getGradesDropdown() {
        return this.API.post('gradepairs/getGradesDropdown');
    }
}
