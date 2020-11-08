import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {ApiResponse} from "../../../models/ApiResponse";

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.scss']
})
export class ForgetUsernameComponent implements OnInit {

    forgotForm: FormGroup;
    formProcessing = false;
    labels = {};

    respMessage: string = null;
    respMessageType: string = null;

    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router
    ) { }

    ngOnInit() {
        document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

        this.initForm();
    }

    private initForm() {
        this.forgotForm = new FormGroup({
            'email': new FormControl(null, [
                Validators.required
            ]),
        });
    }

    submit() {
        if (this.forgotForm.valid !== true) {
            return false;
        }
        this.respMessage = null;
        this.formProcessing = true;

        const formData = this.forgotForm.value;
        const email = formData.email;

        this.authService.sendForgotUsernameFormData(email)
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
            this.forgotForm.reset();
            this.respMessageType = 'success';
            this.respMessage = res.message;
            this.formProcessing = false;
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
