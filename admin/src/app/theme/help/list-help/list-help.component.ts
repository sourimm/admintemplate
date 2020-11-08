import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../../../services/notify.service';
import {HelpService} from '../../../services/help.service';
import {ApiResponse} from '../../../models/ApiResponse';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-help',
  templateUrl: './list-help.component.html',
  styleUrls: ['./list-help.component.scss']
})
export class ListHelpComponent implements OnInit {
  loading = true;

  totalRecords = 0;
  page_no = 1;
  page_size = 10;
  order = 'desc';
  order_by = 'id';
  keyword = '';
  category_id = '0';
  categories = [];

  id = 0;
  articles = [];
  article: any;

  message = '';

  constructor(private helpService: HelpService,
              private notifyService: NotifyService) { }

  ngOnInit() {
    this.getArticlesListing();
  }

  onPageChange(e) {
    this.getArticlesListing();
  }

  filter() {
    this.getArticlesListing();
  }

  reset() {
    this.keyword = '';
    this.getArticlesListing();
  }

  selectCategory(category_id) {
    this.category_id = category_id;
    this.getArticlesListing();
  }

  private getArticlesListing() {
    this.articles = [];

    this.helpService.HelpArticleListing(
      this.page_no,
      this.page_size,
      this.order,
      this.order_by,
      this.keyword,
      this.category_id,
    )
      .then(
        (res: ApiResponse) => {
          if (res.status === true) {
            this.loading = true;
            this.articles = res.data.result;
            this.totalRecords = +res.data.filtered_records;
            this.page_no = +res.data.page;
            this.page_size = +res.data.per_page;
            this.categories = res.data.category_dropdown;
            this.category_id = res.data.category_selected;
            this.keyword = res.data.keyword;
            this.message = res.message;
            this.loading = false;
          } else {
            this.notifyService.error(res.message);
          }
        }
      )
      .catch((error: any) => {});
  }

  changeStatus(id) {
    this.helpService.changeStatusHelpArticle(id)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          // this.getArticlesListing();
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {});
  }

  changeStatusTopArticle(id) {
    this.helpService.changeStatusHelpTopArticle(id)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          // this.getArticlesListing();
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {});
  }

  openConfirmsSwalArticle(id) {
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.helpService.deleteArticle(id)
          .then((res: ApiResponse) => {
            if (res.status === true) {
              // swal(
              //     'Deleted!',
              //     res.message,
              //     'success'
              // );
              this.getArticlesListing();
              this.notifyService.success(res.message);
            } else {
              this.notifyService.error(res.message);
            }
          })
          .catch((error: any) => {});
      }
    });
  }
}
