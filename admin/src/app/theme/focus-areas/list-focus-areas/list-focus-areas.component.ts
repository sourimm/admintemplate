import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../services/notify.service";
import {FocusareaService} from "../../../services/focusarea.service";
import {ApiResponse} from "../../../models/ApiResponse";
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-focus-areas',
  templateUrl: './list-focus-areas.component.html',
  styleUrls: ['./list-focus-areas.component.scss']
})
export class ListFocusAreasComponent implements OnInit {

    loading = true;

    id = 0;

    totalRecords = 0;
    page_no = 1;
    page_size = 10;
    order = 'asc';
    order_by = 'id';
    keyword = '';

    focusareas = [];

    message = '';

    @ViewChild('modalLarge') private modalLarge;
    addModalLarge = false;
    focusareaDataLoading = true;
    focusareaData: any;

    focusareaForm: FormGroup;
    formProcessing = false;

    validationErrors: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private focusareaService: FocusareaService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.getFocusareaListing();
    }

    onPageChange(e) {
        this.getFocusareaListing();
    }

    filter() {
        this.getFocusareaListing();
    }

    reset() {
        this.keyword = '';
        this.getFocusareaListing();
    }

    private getFocusareaListing() {
        this.focusareas = [];

        this.loading = true;

        this.focusareaService.FocusareaListing(
            this.page_no,
            this.page_size,
            this.order,
            this.order_by,
            this.keyword,
        )
            .then(
                (res: ApiResponse) => {
                    if (res.status === true) {
                        this.loading = true;
                        this.focusareas = res.data.result;
                        this.totalRecords = +res.data.filtered_records;
                        this.page_no = +res.data.page;
                        this.page_size = +res.data.per_page;
                        this.message = res.message;
                        this.loading = false;
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
                this.focusareaService.deleteFocusarea(id)
                    .then((res: ApiResponse) => {
                        if (res.status === true) {
                            // swal(
                            //     'Deleted!',
                            //     res.message,
                            //     'success'
                            // );
                            this.reset();
                            this.notifyService.success(res.message);
                        } else {
                            this.notifyService.error(res.message);
                        }
                    })
                    .catch((error: any) => {});
            }
        });
    }


    getFocusareaFormData(id = 0) {
        this.validationErrors = {};
        this.id = id;

        this.addModalLarge = true;
        setTimeout(() => {
            this.modalLarge.show();
        }, 100);

        this.focusareaService.getFocusareaFormData(this.id)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.focusareaData = res.data.focusarea;
                    this.focusareaDataLoading = false;
                    this.initForm();
                } else {
                    this.router.navigate(['focus-areas/list']);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private initForm() {
        const data = this.focusareaData;

        this.focusareaForm = new FormGroup({
            'id': new FormControl(data.id),
            'title': new FormControl(data.title),
        });
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.focusareaForm.getRawValue();

        const data = {
            'id': formData.id,
            'title': formData.title,
        };

        this.focusareaService.submitFocusareaForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.initForm();
                    setTimeout(() => {
                        this.modalLarge.hide();
                    }, 100);
                    this.addModalLarge = false;
                    this.formProcessing = false;
                    this.getFocusareaListing();
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
