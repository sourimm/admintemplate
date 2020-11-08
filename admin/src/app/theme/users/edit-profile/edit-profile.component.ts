import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ApiResponse} from '../../../models/ApiResponse';

import {NotifyService} from '../../../services/notify.service';
import {GeneralService} from '../../../services/general.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('idPhoto') photo: ElementRef;

  profileForm: FormGroup;
  pageTitle = 'Edit Profile';

  loading = true;
  formProcessing = false;

  profileFormEnable = false;

  idPhotoName = '';

  imageUrl: any;
  showFakeImg = false;

  userProfileData: any;

  validationErrors: any;

  constructor(private notifyService: NotifyService,
              private generalService: GeneralService,
              private userServices: UserService,
              private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.generalService.getProfileFormData()
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.userProfileData = res.data.admin;
          this.profileFormInit(this.userProfileData);
          this.loading = false;
          this.profileFormEnable = true;
        } else {
          this.router.navigate(['dashboard']);
        }
      })
      .catch((error: any) => {});
  }

  private profileFormInit(data) {
    this.profileForm = new FormGroup({
      'name': new FormControl(data.name, [
        Validators.required
      ]),
      'username': new FormControl(data.username, [
        Validators.required
      ]),
      'email': new FormControl(data.email, [
        Validators.required
      ]),
      'idPhoto': new FormControl({
        'value': '',
        'ext': 'jpg'
      }),
    });

    if (data.avatar === null) {
      this.profileForm.get('idPhoto').setValidators([Validators.required]);
    }
  }

  showInputFilePopup(event) {
    if (event.type === 'click') {
      const el: HTMLElement = this.photo.nativeElement as HTMLElement;
      el.click();
    }
  }

  onIdPhotoLoad(event) {
    if (event.target.files[0].size > (5 * 1024 * 1024)) {
      this.notifyService.error('File size cannot be greater than 5MB');
      return false;
    }
    this.idPhotoName = event.target.files[0].name;
    const reader = new FileReader();
    const idext = event.target.files[0].name.split('.').pop().toLowerCase();
    reader.onload =  (progressEvent: ProgressEvent) => {
      this.imageUrl = (<FileReader>progressEvent.target).result;
      this.showFakeImg = true;
      this.profileForm.get('idPhoto').setValue({
        value: reader.result,
        ext: idext
      });
    };
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
    }
  }

  submit() {
    this.formProcessing = true;
    this.validationErrors = {};

    const formData = this.profileForm.getRawValue();

    const idPhoto = (typeof formData.idPhoto.value !== 'undefined') ? formData.idPhoto.value : '';
    const idExt = (typeof formData.idPhoto.ext !== 'undefined') ? formData.idPhoto.ext : 'jpg';

    const data = {
      'name': formData.name,
      'username': formData.username,
      'email': formData.email,
      'avatar': idPhoto,
      'ext': idExt
    };

    this.generalService.submitEditProfileForm(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          // this.notifyService.success(res.message);
          this.userServices.emitFullName.emit(res.data.name);
          this.userServices.emitAvatar.emit(res.data.avatar);
          this.router.navigate(['dashboard']);
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
