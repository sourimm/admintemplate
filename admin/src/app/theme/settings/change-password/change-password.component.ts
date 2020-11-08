import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingService} from "../../../services/setting.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {NotifyService} from "../../../services/notify.service";
import {ApiResponse} from "../../../models/ApiResponse";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    changePasswordForm: FormGroup;

    loading = true;
    formProcessing = false;

    validationErrors: any;

    constructor(private settingService: SettingService,
                private authService: AuthService,
                private router: Router,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.changePasswordForm = new FormGroup({
            'current_password': new FormControl('', [
                Validators.required
            ]),
            'new_password': new FormControl('', [
                Validators.required
            ]),
            'confirm_password': new FormControl('', [
                Validators.required
            ]),
        });

        this.loading = false;
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.changePasswordForm.getRawValue();

        this.settingService.changePassword(formData.current_password, formData.new_password, formData.confirm_password)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.formProcessing = false;
                    this.notifyService.success(res.message);
                    this.authService.removeLocalStorageAuthToken();
                    this.router.navigate(['login']);
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
