import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListQuotesComponent} from './list-quotes/list-quotes.component';
import {ViewQuoteComponent} from './view-quote/view-quote.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
  },
    {
        path: 'list',
        component: ListQuotesComponent,
        data: {
            title: 'Inquiries'
        }
    },
    {
        path: 'view/:id',
        component: ViewQuoteComponent,
        data: {
            title: 'View Inquiry'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
