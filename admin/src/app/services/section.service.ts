import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

    constructor(private API: ApiService) { }

    getPageSectionFormData(id, page, order) {
        return this.API.post('pagesection/get_page_section_data', {
            'id': id,
            'page': page,
            'order': order,
        });
    }

    submitPageSectionForm(data) {
        return this.API.post('pagesection/page_save_section', data);
    }

    PageSectionListing(data) {
        return this.API.post('pagesection/page_section_listing', data);
    }

    deleteSection(id) {
        return this.API.post('pagesection/delete_section', {
            'id': id
        });
    }

    getFooterSection() {
      return this.API.post('pagesection/get_footer_data');
    }

    submitFooterSection(data) {
      return this.API.post('pagesection/save_footer_data', data);
    }
}
