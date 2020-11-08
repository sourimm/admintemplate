import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

    constructor(private API: ApiService) { }

    getCategoryFormData(id) {
        return this.API.post('category/get_category_data', {
            'id': id
        });
    }

    submitCategoryForm(data) {
        return this.API.post('category/save_category', data);
    }

    CategoryListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('category/category_listing', data);
    }

    deleteCategory(id) {
        return this.API.post('category/delete_category', {
            'id': id
        });
    }
}
