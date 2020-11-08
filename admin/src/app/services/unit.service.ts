import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UnitService {

    constructor(private API: ApiService) { }

    getUnitFormData(id, grade_pair_id) {
        return this.API.post('units/get_unit_data', {
            'id': id,
            'grade_pair_id': grade_pair_id,
        });
    }

    submitUnitForm(data) {
        return this.API.post('units/save_unit', data);
    }

    UnitListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('units/unit_listing', data);
    }

    deleteUnit(id) {
        return this.API.post('units/delete_unit', {
            'id': id
        });
    }

    getGradesDropdown() {
        return this.API.post('lesson/getGradesDropdown');
    }

    getFocusAreasDropdown() {
        return this.API.post('focusarea/getFocusAreasDropdown');
    }

    getCategoriesDropdown() {
        return this.API.post('lesson/getCategoriesDropdown');
    }
}
