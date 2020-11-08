import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NotifyService} from '../../../services/notify.service';
import {SectionService} from '../../../services/section.service';
import {ApiResponse} from '../../../models/ApiResponse';

@Component({
  selector: 'app-footer-section',
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.scss']
})
export class FooterSectionComponent implements OnInit {
  loading = true;
  formProcessing = false;
  footerData: any;
  form: FormGroup;
  validationErrors: any;

  constructor(private sectionService: SectionService,
              private notifyService: NotifyService) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.loading = true;
    this.sectionService.getFooterSection()
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.footerData = res.data.footer_section;
          this.initForm();
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {});
  }

  private initForm() {
    this.form = new FormGroup({
      'id': new FormControl(this.footerData.id, []),
      'facebook_link': new FormControl(this.footerData.facebook_link, []),
      'twitter_link': new FormControl(this.footerData.twitter_link, []),
      'linkedin_link': new FormControl(this.footerData.linkedin_link, []),
      'phone': new FormControl(this.footerData.phone, []),
      'email': new FormControl(this.footerData.email, []),
      'description': new FormControl(this.footerData.description, []),
      'placeholder': new FormControl(this.footerData.placeholder, []),
      'button_text': new FormControl(this.footerData.button_text, []),
    });
    this.loading = false;
  }

  submit() {
    this.formProcessing = true;
    this.validationErrors = {};

    const formData = this.form.getRawValue();

    const data = {
      'id': formData.id,
      'facebook_link': formData.facebook_link,
      'twitter_link': formData.twitter_link,
      'linkedin_link': formData.linkedin_link,
      'phone': formData.phone,
      'email': formData.email,
      'description': formData.description,
      'placeholder': formData.placeholder,
      'button_text': formData.button_text,
    };

    this.sectionService.submitFooterSection(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.getData();
        } else {
          this.notifyService.error(res.message);
        }
        this.formProcessing = false;
      })
      .catch((error: any) => {
        this.formProcessing = false;
        if (error.status === 422) {
          this.validationErrors = error.error.errors;
        } else {}
      });
  }
}
