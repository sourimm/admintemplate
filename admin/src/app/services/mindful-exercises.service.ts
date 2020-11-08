import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class MindfulExercisesService {

    constructor(private API: ApiService) { }

    getMindfulExercisesFormData(id) {
        return this.API.post('mindfulexercises/get_mindfulexercises_data', {
            'id': id
        });
    }

    submitMindfulExercisesForm(data) {
        return this.API.post('mindfulexercises/save_mindfulexercises', data);
    }

    MindfulExercisesListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('mindfulexercises/mindfulexercises_listing', data);
    }

    deleteMindfulExercises(id) {
        return this.API.post('mindfulexercises/delete_mindfulexercises', {
            'id': id
        });
    }

    getGradesDropdown() {
        return this.API.post('gradepairs/getGradesDropdown');
    }
}
