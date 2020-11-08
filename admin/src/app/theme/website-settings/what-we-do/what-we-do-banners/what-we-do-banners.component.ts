import {Component, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {FormControl, FormGroup} from '@angular/forms';
import {BannerService} from '../../../../services/banner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifyService} from '../../../../services/notify.service';
import {ApiResponse} from '../../../../models/ApiResponse';

@Component({
  selector: 'app-what-we-do-banners',
  templateUrl: './what-we-do-banners.component.html',
  styleUrls: ['./what-we-do-banners.component.scss']
})
export class WhatWeDoBannersComponent implements OnInit {

  bannerForm: FormGroup;

  id = 0;

  form_loading = true;
  formProcessing = false;

  pageTitle = 'Add Banner';
  bannerData: any;

  validationErrors: any;

  fileData: File = null;
  previewUrl: any = null;

  edit = false;

  image = false;
  video = false;

  banners = [];
  banners_loading = true;
  message = '';

  page = 'what-we-do';

  bannersArray = [];

  loadBannerImage = true;
  bannerImageData: any;
  addModalLarge = false;
  @ViewChild('modalLarge') private modalLarge;
  bannerValidationErrors: any;
  showImage = false;

  constructor(private bannerService: BannerService,
              private route: ActivatedRoute,
              private router: Router,
              private notifyService: NotifyService) { }

  ngOnInit() {
    this.getFormData(this.id);
    this.getBannerListing(this.page);
    this.getBannerImage();
  }

  private getFormData(id) {
    this.id = id;
    if (this.id > 0) {
      this.pageTitle = 'Edit Banner';
    }

    this.fileData = null;
    this.previewUrl = null;

    this.bannerService.getBannerFormData(id)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.bannerData = res.data.banner;
          this.initForm();

          if (id > 0) {
            this.edit = true;
          }

          this.form_loading = false;
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {
      });
  }

  private initForm() {
    const data = this.bannerData;

    this.bannerForm = new FormGroup({
      'id': new FormControl(data.id),
      'page': new FormControl(this.page),
      'heading_line_1': new FormControl(data.heading_line_1),
      'heading_line_2': new FormControl(data.heading_line_2),
      'description': new FormControl(data.description),
      'button_text': new FormControl(data.button_text),
      'button_url': new FormControl(data.button_url),
      'media_type': new FormControl(''),
      'media_path': new FormControl(''),
      'file': new FormControl(''),
    });
  }

  submit() {
    this.formProcessing = true;
    this.validationErrors = {};

    const formData = this.bannerForm.getRawValue();

    const data = {
      'id': formData.id,
      'page': formData.page,
      'heading_line_1': formData.heading_line_1,
      'heading_line_2': formData.heading_line_2,
      'description': formData.description,
      'button_text': formData.button_text,
      'button_url': formData.button_url,
      'media_type': formData.media_type,
      'media_path': formData.media_path,
    };

    this.bannerService.submitBannerForm(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.formProcessing = false;
          this.edit = false;
          this.id = 0;
          this.pageTitle = 'Add Banner';
          this.getFormData(this.id);
          this.getBannerListing(this.page);
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

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.edit = false;
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      this.notifyService.error('Invalid file type');
      return false;
    } else {
      this.image = true;
      this.video = false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.showImage = false;
      this.previewUrl = reader.result;
      this.bannerImageData.media_path = this.previewUrl;
      // this.bannerForm.get('media_path').setValue(this.previewUrl);
      // this.bannerForm.get('media_type').setValue(mimeType);
    };
  }

  private getBannerListing(page) {
    this.banners = [];

    this.bannerService.BannerListing(page)
      .then(
        (res: ApiResponse) => {
          if (res.status === true) {
            this.banners = res.data.result;
            this.bannersArray = this.banners;
            this.message = res.message;
            this.banners_loading = false;
          } else {
            this.notifyService.error(res.message);
          }
        }
      )
      .catch((error: any) => {
      });
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
        this.bannerService.deleteBanner(id)
          .then((res: ApiResponse) => {
            if (res.status === true) {
              this.notifyService.success(res.message);
              this.getBannerListing(this.page);
            } else {
              this.notifyService.error(res.message);
            }
          })
          .catch((error: any) => {});
      }
    });
  }

  submitOrder() {
    const data = {
      'banners': JSON.stringify(this.bannersArray),
    };
    this.bannerService.submitBannerOrderForm(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
        } else {
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

  private getBannerImage() {
    this.bannerService.getBannerImageFormData(this.page)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.bannerImageData = res.data.banner_image;
          this.loadBannerImage = false;
          this.showImage = true;
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {});
  }

  openModal() {
    this.addModalLarge = true;
    setTimeout(() => {
      this.modalLarge.show();
    }, 100);
  }

  submitBannerImage() {
    this.formProcessing = true;
    this.bannerService.submitBannerImageForm(this.bannerImageData)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
        } else {
          this.notifyService.error(res.message);
        }
        this.formProcessing = false;
      })
      .catch((error: any) => {
        this.formProcessing = false;
        if (error.status === 422) {
          this.bannerValidationErrors = error.error.errors;
        } else {}
      });
  }
}
