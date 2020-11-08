import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PrintableResourcesCategoriesService {

    constructor(private API: ApiService) { }

    getCategoryFormData(id) {
        return this.API.post('printableresourcecategory/get_printableresourcecategory_data', {
            'id': id
        });
    }

    submitCategoryForm(data) {
        return this.API.post('printableresourcecategory/save_printableresourcecategory', data);
    }

    CategoryListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('printableresourcecategory/printableresourcecategory_listing', data);
    }

    deleteCategory(id) {
        return this.API.post('printableresourcecategory/delete_printableresourcecategory', {
            'id': id
        });
    }
}
