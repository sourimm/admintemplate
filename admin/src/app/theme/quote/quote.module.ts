import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { ListQuotesComponent } from './list-quotes/list-quotes.component';
import { ViewQuoteComponent } from './view-quote/view-quote.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    QuoteRoutingModule,
      SharedModule
  ],
  declarations: [ListQuotesComponent, ViewQuoteComponent]
})
export class QuoteModule { }
