import { Component, OnInit } from '@angular/core';
import {ApiResponse} from "../../../models/ApiResponse";
import {QuoteService} from "../../../services/quote.service";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'app-list-quotes',
  templateUrl: './list-quotes.component.html',
  styleUrls: ['./list-quotes.component.scss']
})
export class ListQuotesComponent implements OnInit {

    loading = true;

    totalRecords = 0;
    page_no = 1;
    page_size = 10;
    order = 'desc';
    order_by = 'id';
    keyword = '';

    quotes = [];
    quote: any;

    message = '';

    loadModal = false;

    constructor(private quoteService: QuoteService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.getQuoteListing();
    }

    onPageChange(e) {
        this.getQuoteListing();
    }

    filter() {
        this.getQuoteListing();
    }

    reset() {
        this.keyword = '';

        this.getQuoteListing();
    }

    private getQuoteListing() {
      console.log('In Quotes');
        this.quotes = [];

        this.quoteService.QuoteListing(
            this.page_no,
            this.page_size,
            this.order,
            this.order_by,
            this.keyword,
        )
            .then(
                (res: ApiResponse) => {
                    if (res.status === true) {
                        this.loading = true;
                        this.quotes = res.data.result;
                        this.totalRecords = +res.data.filtered_records;
                        this.page_no = +res.data.page;
                        this.page_size = +res.data.per_page;
                        this.message = res.message;
                        this.loading = false;
                    } else {
                        this.notifyService.error(res.message);
                    }
                }
            )
            .catch((error: any) => {
            });
    }

}
