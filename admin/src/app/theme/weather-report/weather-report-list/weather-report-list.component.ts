import {Component, OnInit, ViewChild} from '@angular/core';
import {WeatherReportService} from '../../../services/weather-report.service';
import {NotifyService} from '../../../services/notify.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiResponse} from '../../../models/ApiResponse';
import swal from 'sweetalert2';

@Component({
  selector: 'app-weather-report-list',
  templateUrl: './weather-report-list.component.html',
  styleUrls: ['./weather-report-list.component.scss']
})
export class WeatherReportListComponent implements OnInit {
  loading = true;
  characterImg: any;

  reports = [];
  reportCategories = [];
  dropdown = [];
  formData = {
    'id': '0',
    'title': '',
    'video_url': '',
    'parent_id': '0',
    'image_url': '',
  };
  type = 'category';

  form: FormGroup;

  @ViewChild('modalLarge') private modalLarge;
  addModalLarge = false;

  fileData: File = null;
  previewUrl: any = null;
  edit = false;
  formLoading = true;
  formProcessing = false;

  validationErrors: any;

  subLoading = true;
  showSubCategory = false;
  categoryName = '-';

  constructor(private weatherReportService: WeatherReportService,
              private notifyService: NotifyService) { }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.weatherReportService.getList()
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.reports = res.data.reports;
          this.dropdown = res.data.dropdown;
          this.loading = false;
          this.subLoading = false;
          if (this.showSubCategory === true) {
            for (let i = 0; i < this.reports.length; i++) {
              if (this.reports[i].title === this.categoryName) {
                this.reportCategories = this.reports[i].sub_categories;
              }
            }
          }
          // this.addEdit('category', this.formData);
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {});
  }

  addEdit(type, item) {
    this.validationErrors = {};
    this.type = type;
    this.formData = {
      'id': item.id,
      'title': item.title,
      'parent_id': item.parent_id,
      'video_url': item.video_url,
      'image_url': item.image_url,
    };

    if (+item.id > 0) {
      this.edit = true;
    } else {
      this.edit = false;
    }

    this.form = new FormGroup({
      'id': new FormControl(this.formData.id, []),
      'title': new FormControl(this.formData.title, []),
      'video_url': new FormControl(this.formData.video_url, []),
      'parent_id': new FormControl(this.formData.parent_id, []),
      'type': new FormControl(type, []),
      'image_url': new FormControl(''),
      'file': new FormControl(''),
    });

    this.addModalLarge = true;
    this.formLoading = false;
    setTimeout(() => {
      this.modalLarge.show();
    }, 100);
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
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.form.get('image_url').setValue(this.previewUrl);
    };
  }

  submit() {
    this.formProcessing = true;
    this.validationErrors = {};

    const formData = this.form.getRawValue();

    let parent_id = '';
    if (formData.parent_id > 0) {
      parent_id = formData.parent_id;
    }

    const data = {
      'id': formData.id,
      'title': formData.title,
      'video_url': formData.video_url,
      'parent_id': parent_id,
      'type': formData.type,
      'image_url': encodeURI(formData.image_url),
      'media_type': 'file',
    };

    this.weatherReportService.saveData(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.edit = false;
          this.formData = {
            'id': '0',
            'title': '',
            'video_url': '',
            'parent_id': '0',
            'image_url': '',
          };
          this.addEdit('category', this.formData);
          setTimeout(() => {
            this.modalLarge.hide();
          }, 100);
          this.addModalLarge = false;
          this.formProcessing = false;
          this.previewUrl = '';
          this.form.reset();
          this.getReports();
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

  showSubCategoryData(item) {
    this.categoryName = item.title;
    this.reportCategories = item.sub_categories;
    this.showSubCategory = true;
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
        this.weatherReportService.deleteData(id)
          .then((res: ApiResponse) => {
            if (res.status === true) {
              this.getReports();
              this.notifyService.success(res.message);
            } else {
              this.notifyService.error(res.message);
            }
          })
          .catch((error: any) => {});
      }
    });
  }

  processCharacter(fileInput: any) {
    const dt = <File>fileInput.target.files[0];

    const mimeType = dt.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.notifyService.error('Invalid file type');
    //   return false;
    // }
    if (mimeType !== 'image/png') {
      this.notifyService.error('You must have to choose a png image');
      return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(dt);
    reader.onload = (_event) => {
      this.characterImg = reader.result;
    };

  }

  uploadCharacterImage() {
    const data = {
      'image_url': encodeURI(this.characterImg),
    };

    this.weatherReportService.uploadCharacterImage(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 100);
          this.characterImg = null;
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
}
