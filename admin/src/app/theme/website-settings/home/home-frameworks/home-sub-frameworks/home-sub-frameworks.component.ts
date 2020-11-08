import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {EducationFrameworkService} from "../../../../../services/education-framework.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../../../services/notify.service";
import {ApiResponse} from "../../../../../models/ApiResponse";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home-sub-frameworks',
  templateUrl: './home-sub-frameworks.component.html',
  styleUrls: ['./home-sub-frameworks.component.scss']
})
export class HomeSubFrameworksComponent implements OnInit, OnChanges {

    @Input() flags = false;
    @Input() parent_id: any;
    @Output() isSuccessed = new EventEmitter<boolean>();

    @ViewChild('modalLarge') private modalLarge;
    addModalLarge = false;

    frameworkForm: FormGroup;

    id = 0;

    form_loading = true;
    formProcessing = false;

    pageTitle = 'Add Sub Framework';
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
        // this.getFormData(this.id);
        // this.getFrameworkListing(this.parent_id);
    }

    ngOnChanges() {
        this.getFormData(this.id);
        this.getFrameworkListing(this.parent_id);
    }

    private getFormData(id) {

        this.addModalLarge = true;
        setTimeout(() => {
            this.modalLarge.show();
        }, 100);

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
            'parent_id': new FormControl(this.parent_id),
            'section_id': new FormControl(0),
            'description': new FormControl(data.description),
            'color': new FormControl(data.color),
            'media_type': new FormControl(data.media_type),
            'media_path': new FormControl(data.media_path),
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
            'description': formData.description,
            'color': formData.color,
            'media_type': 'image/link',
            'media_path': formData.media_path,
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

}
