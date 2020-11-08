import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

    constructor(private API: ApiService) { }

    getQuoteData(id) {
        return this.API.post('quote/get_quote_data', {
            'id': id
        });
    }

    QuoteListing(page_no, page_size, order, order_by, keyword) {
        const data = {
            'page_no': page_no,
            'page_size': page_size,
            'order': order,
            'order_by': order_by,
            'keyword': keyword,
        };
        return this.API.post('quote/quote_listing', data);
    }
}
