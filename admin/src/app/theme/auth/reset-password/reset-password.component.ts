import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiResponse} from "../../../models/ApiResponse";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    loginForm: FormGroup;
    formProcessing = false;
    labels = {};

    respMessage: string = null;
    respMessageType: string = null;

    token = '';

    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

        const token = this.route.snapshot.params['token'];
        if (typeof token !== 'undefined') {
            this.token = token;
        }
        this.initForm();
    }

    private initForm() {
        this.loginForm = new FormGroup({
            'username': new FormControl(null, [
                Validators.required
            ]),
            'password': new FormControl(null, [
                Validators.required
            ]),
            'conf_password': new FormControl(null, [
                Validators.required
            ]),
        });
    }

    submit() {
        if (this.loginForm.valid !== true) {
            return false;
        }
        this.respMessage = null;
        this.formProcessing = true;

        const formData = this.loginForm.value;
        const username = formData.username;
        const password = formData.password;
        const conf_password = formData.conf_password;

        this.authService.sendResetPasswordFormData(this.token, username, password, conf_password)
            .then(
                (res: ApiResponse) => {
                    this.responseApiNext(res);
                }
            )
            .catch((error: any) => {
                this.responseApiError(error);
            });
    }

    private responseApiNext(res) {
        if (res.status === true) {
            this.respMessageType = 'success';
            this.respMessage = res.message;
            setTimeout(
                () => {
                    this.router.navigate(['/login']);
                }, 2000
            );
        } else {
            this.respMessageType = 'danger';
            this.respMessage = res.message;
            this.formProcessing = false;
        }
    }

    private responseApiError(error) {
        if (error.status === 422) {
            this.respMessageType = 'danger';
            this.respMessage = error.error.data;
        } else {
            this.apiService.handleError(error, true);
            this.respMessageType = 'danger';
            this.respMessage = error.error.message;
        }
        this.formProcessing = false;
    }

}
