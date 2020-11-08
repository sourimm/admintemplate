import { Component, OnInit } from '@angular/core';
import {QuoteService} from "../../../services/quote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../services/notify.service";
import {ApiResponse} from "../../../models/ApiResponse";

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.scss']
})
export class ViewQuoteComponent implements OnInit {

    id = 0;

    form_loading = true;
    formProcessing = false;

    pageTitle = 'Inquiry Detail';
    quoteData: any;

    validationErrors: any;

    constructor(private quoteService: QuoteService,
                private route: ActivatedRoute,
                private router: Router,
                private notifyService: NotifyService) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (typeof id !== 'undefined') {
            this.id = id;
        }

        this.getData(this.id);
    }

    private getData(id) {

        this.quoteService.getQuoteData(id)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.quoteData = res.data.quote;
                    this.form_loading = false;
                } else {
                    this.router.navigate(['quote']);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

}
