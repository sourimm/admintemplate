import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PrintableResourcesService {

    constructor(private API: ApiService) { }

    getResourceFormData(id) {
        return this.API.post('printableresource/get_printableresource_data', {
            'id': id
        });
    }

    submitResourceForm(data) {
        return this.API.post('printableresource/save_printableresource', data);
    }

    ResourceListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('printableresource/printableresource_listing', data);
    }

    deleteResource(id) {
        return this.API.post('printableresource/delete_printableresource', {
            'id': id
        });
    }

    getGradesDropdown() {
        return this.API.post('lesson/getGradesDropdown');
    }

    getResourceCategoriesDropdown() {
        return this.API.post('printableresourcecategory/getPrintableresourcecategoriesDropdown');
    }
}
