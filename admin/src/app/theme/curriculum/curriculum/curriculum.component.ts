import {Component, OnInit, ViewChild} from '@angular/core';
import {CurriculumService} from "../../../services/curriculum.service";
import {ApiResponse} from "../../../models/ApiResponse";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../services/notify.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

    loading = true;

    id = 0;

    totalRecords = 0;
    page_no = 1;
    page_size = 10;
    order = 'asc';
    order_by = 'id';
    keyword = '';

    curriculums = [];

    message = '';

    @ViewChild('modalLarge') private modalLarge;
    addModalLarge = false;
    curriculumDataLoading = true;
    curriculumData: any;

    curriculumForm: FormGroup;
    formProcessing = false;

    validationErrors: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private curriculumService: CurriculumService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.getCurriculumListing();
    }

    onPageChange(e) {
        this.getCurriculumListing();
    }

    filter() {
        this.getCurriculumListing();
    }

    reset() {
        this.keyword = '';
        this.getCurriculumListing();
    }

    private getCurriculumListing() {
        this.curriculums = [];

        this.loading = true;

        this.curriculumService.CurriculumListing(
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
                        this.curriculums = res.data.result;
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
                this.curriculumService.deleteCurriculum(id)
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


    getCurriculumFormData(id = 0) {
        this.validationErrors = {};
        this.id = id;

        this.addModalLarge = true;
        setTimeout(() => {
            this.modalLarge.show();
        }, 100);

        this.curriculumService.getCurriculumFormData(this.id)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.curriculumData = res.data.curriculum;
                    this.curriculumDataLoading = false;
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
        const data = this.curriculumData;

        this.curriculumForm = new FormGroup({
            'id': new FormControl(data.id),
            'file_path': new FormControl(data.file_path),
        });
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.curriculumForm.getRawValue();

        const data = {
            'id': formData.id,
            'file_path': formData.file_path,
        };

        this.curriculumService.submitCurriculumForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.initForm();
                    setTimeout(() => {
                        this.modalLarge.hide();
                    }, 100);
                    this.addModalLarge = false;
                    this.formProcessing = false;
                    this.getCurriculumListing();
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
