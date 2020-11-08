import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../../services/notify.service";
import {ApiResponse} from "../../../../models/ApiResponse";
import swal from 'sweetalert2';
import {EducationFrameworkService} from "../../../../services/education-framework.service";

@Component({
  selector: 'app-home-frameworks',
  templateUrl: './home-frameworks.component.html',
  styleUrls: ['./home-frameworks.component.scss']
})
export class HomeFrameworksComponent implements OnInit {

    frameworkForm: FormGroup;

    id = 0;
    parent_id = 0;

    flags = false;

    form_loading = true;
    formProcessing = false;

    pageTitle = 'Add Framework';
    frameworkData: any;

    validationErrors: any;

    frameworks = [];
    frameworks_loading = true;
    message = '';

    page = 'home/frameworks';

    frameworksArray = [];

    constructor(private frameworkService: EducationFrameworkService,
                private route: ActivatedRoute,
                private router: Router,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.getFormData(this.id);
        this.getFrameworkListing(this.parent_id);
    }

    private getFormData(id) {

        this.frameworkService.getFrameworkFormData(id)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.frameworkData = res.data.framework;
                    this.initForm();

                    this.form_loading = false;
                } else {
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private initForm() {
        const data = this.frameworkData;

        this.frameworkForm = new FormGroup({
            'id': new FormControl(data.id),
            'parent_id': new FormControl(0),
            'section_id': new FormControl(0),
            'heading': new FormControl(data.heading),
        });
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.frameworkForm.getRawValue();

        const data = {
            'id': formData.id,
            'parent_id': formData.parent_id,
            'section_id': formData.section_id,
            'heading': formData.heading,
        };

        this.frameworkService.submitFrameworkForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.formProcessing = false;
                    this.initForm();
                    this.getFrameworkListing(this.parent_id);
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

    private getFrameworkListing(id) {
        this.frameworks = [];

        this.frameworkService.FrameworkListing(id)
            .then(
                (res: ApiResponse) => {
                    if (res.status === true) {
                        this.frameworks = res.data.result;
                        this.frameworksArray = this.frameworks;
                        this.message = res.message;
                        this.frameworks_loading = false;
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
                this.frameworkService.deleteFramework(id)
                    .then((res: ApiResponse) => {
                        if (res.status === true) {
                            this.notifyService.success(res.message);
                            this.getFrameworkListing(this.parent_id);
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
            'frameworks': JSON.stringify(this.frameworksArray),
        };
        this.frameworkService.submitFrameworkOrderForm(data)
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

    updateFrameworksModal(id) {
        this.flags = !this.flags;
        this.parent_id = id;
    }

}
