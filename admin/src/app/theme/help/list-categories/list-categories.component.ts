import {Component, OnInit, ViewChild} from '@angular/core';
import {SlugifyPipe} from '../../../pipes/slugify.pipe';
import {ApiResponse} from '../../../models/ApiResponse';
import {HelpService} from '../../../services/help.service';
import {NotifyService} from '../../../services/notify.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  loading = true;

  id = 0;
  categories = [];
  category: any;

  message = '';

  edit = false;
  addModalLarge = false;

  validationErrors: any;
  formProcessing = false;

  @ViewChild('modalLarge') private modalLarge;
  slug = '';
  title = '';
  active = true;

  constructor(private slugifyPipe: SlugifyPipe,
              private helpService: HelpService,
              private notifyService: NotifyService) { }

  ngOnInit() {
    this.getCategoriesListing();
  }

  private getCategoriesListing() {
    this.categories = [];

    this.helpService.HelpCategoryListing()
      .then(
        (res: ApiResponse) => {
          if (res.status === true) {
            this.loading = true;
            this.categories = res.data.categories;
            this.message = res.message;
            this.loading = false;
          } else {
            this.notifyService.error(res.message);
          }
        }
      )
      .catch((error: any) => {});
  }

  getCategoryFormData(id = 0) {
    this.validationErrors = {};
    this.id = id;
    this.addModalLarge = true;

    this.helpService.getHelpCategoryFormData(this.id)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.category = res.data.category;

          this.title = this.category.title;
          this.slug = this.category.slug;
          this.active = this.category.active;

          this.edit = false;
          if (id > 0) {
            this.edit = true;
          }

          setTimeout(() => {
            this.modalLarge.show();
          }, 100);
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {});
  }

  slugify(input: string) {
    this.slug = this.slugifyPipe.transform(input);
  }

  submit() {
    if (this.title.trim() === '') {
      this.notifyService.error('Title is required');
      return false;
    }

    let active = '0';
    if (this.active === true) {
      active = '1';
    }

    const data = {
      'id': this.id,
      'title': this.title,
      'slug': this.slug,
      'active': active,
    };
    this.validationErrors = {};
    this.formProcessing = true;

    this.helpService.submitHelpCategoryForm(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.edit = false;
          this.getCategoriesListing();
          setTimeout(() => {
            this.modalLarge.hide();
          }, 100);
          this.addModalLarge = false;
          this.formProcessing = false;
        } else {
          this.formProcessing = false;
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {
        this.formProcessing = false;
        if (error.status === 422) {
          this.validationErrors = error.error.errors;
        } else {}
      });
  }

  changeStatus(id) {
    this.helpService.changeStatusHelpCategory(id)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          // this.getCategoriesListing();
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {});
  }

  openConfirmsSwal(id) {
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
        this.helpService.deleteCategory(id)
          .then((res: ApiResponse) => {
            if (res.status === true) {
              // swal(
              //     'Deleted!',
              //     res.message,
              //     'success'
              // );
              this.getCategoriesListing();
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
