import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

    constructor(private API: ApiService) { }

    getBannerFormData(id) {
        return this.API.post('banner/get_banner_data', {
            'id': id
        });
    }

    getBannerImageFormData(page) {
        return this.API.post('banner/get_banner_image', {
            'page': page
        });
    }

    submitBannerForm(data) {
        return this.API.post('banner/save_banner', data);
    }

    submitBannerImageForm(data) {
        return this.API.post('banner/save_banner_image', data);
    }

    submitBannerOrderForm(data) {
        return this.API.post('banner/save_order', data);
    }

    BannerListing(page) {
        return this.API.post('banner/banner_listing', {page: page});
    }

    deleteBanner(id) {
        return this.API.post('banner/delete_banner', {
            'id': id
        });
    }
}
