import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class FocusareaService {

    constructor(private API: ApiService) { }

    getFocusareaFormData(id) {
        return this.API.post('focusarea/get_focusarea_data', {
            'id': id
        });
    }

    submitFocusareaForm(data) {
        return this.API.post('focusarea/save_focusarea', data);
    }

    FocusareaListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('focusarea/focusarea_listing', data);
    }

    deleteFocusarea(id) {
        return this.API.post('focusarea/delete_focusarea', {
            'id': id
        });
    }
}
