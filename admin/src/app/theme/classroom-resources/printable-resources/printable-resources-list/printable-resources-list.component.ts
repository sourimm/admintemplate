import {Component, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../../services/notify.service";
import {PrintableResourcesService} from "../../../../services/printable-resources.service";
import {ApiResponse} from "../../../../models/ApiResponse";

@Component({
  selector: 'app-printable-resources-list',
  templateUrl: './printable-resources-list.component.html',
  styleUrls: ['./printable-resources-list.component.scss']
})
export class PrintableResourcesListComponent implements OnInit {

    loading = true;

    id = 0;

    totalRecords = 0;
    page_no = 1;
    page_size = 10;
    order = 'asc';
    order_by = 'id';
    keyword = '';

    learningareas = [];

    message = '';

    @ViewChild('modalLarge') private modalLarge;
    addModalLarge = false;
    learningareaDataLoading = true;
    learningareaData: any;

    learningareaForm: FormGroup;
    formProcessing = false;

    validationErrors: any;

    fileData: File = null;
    previewUrl: any = null;

    edit = false;


    fileData1: File = null;
    previewUrl1: any = null;

    edit1 = false;

    grades = [];
    categories = [];
    showUrl = true;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private learningareaService: PrintableResourcesService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.getLearningareaListing();
    }

    onPageChange(e) {
        this.getLearningareaListing();
    }

    filter() {
        this.getLearningareaListing();
    }

    reset() {
        this.keyword = '';

        this.getLearningareaListing();
    }

    private getLearningareaListing() {
        this.learningareas = [];

        this.loading = true;

        this.learningareaService.ResourceListing(
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
                        this.learningareas = res.data.result;
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
                this.learningareaService.deleteResource(id)
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

    getLearningareaFormData(id = 0) {
        this.validationErrors = {};
        this.id = id;

        this.fileData = null;
        this.previewUrl = null;
        this.showUrl = true;

        this.addModalLarge = true;
        setTimeout(() => {
            this.modalLarge.show();
        }, 100);

        this.getGrades();
        this.getCategories();

        this.learningareaService.getResourceFormData(this.id)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.learningareaData = res.data.printableresource;

                    this.initForm();

                    if (id > 0) {
                        this.edit = true;
                    }else{
                        this.edit = false;
                    }

                    this.learningareaDataLoading = false;

                } else {
                    this.router.navigate(['learning-area/list']);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private initForm() {
        const data = this.learningareaData;

        this.learningareaForm = new FormGroup({
            'id': new FormControl(data.id),
            'title': new FormControl(data.title),
            'description': new FormControl(data.description),
            'grade_pair_id': new FormControl(data.grade_pair_id),
            'printable_resource_category_id': new FormControl(data.printable_resource_category_id),
            'preview_image': new FormControl(''),
            'media_path': new FormControl(''),
            'file': new FormControl(''),
            'file1': new FormControl(''),
        });
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.learningareaForm.getRawValue();

        const data = {
            'id': formData.id,
            'title': formData.title,
            'description': formData.description,
            'grade_pair_id': formData.grade_pair_id,
            'printable_resource_category_id': formData.printable_resource_category_id,
            'preview_image': encodeURI(formData.preview_image),
            'media_path': encodeURI(formData.media_path),
            'media_type': 'file',
        };

        this.learningareaService.submitResourceForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.edit = false;
                    this.initForm();
                    setTimeout(() => {
                        this.modalLarge.hide();
                    }, 100);
                    this.addModalLarge = false;
                    this.formProcessing = false;
                    this.getLearningareaListing();
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

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.edit = false;
        this.preview();
    }

    preview() {
        // Show preview
        const mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            this.notifyService.error('Invalid file type, only jpeg, jpg or png file allowed');
            this.learningareaForm.get('file').reset();
            return false;
        }

        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
            this.learningareaForm.get('preview_image').setValue(this.previewUrl);
        };
    }


    fileProgress1(fileInput: any) {
        this.fileData1 = <File>fileInput.target.files[0];
        this.edit1 = false;
        this.showUrl = true;
        this.preview1();
    }

    preview1() {
        // Show preview
        const mimeType = this.fileData1.type;

        if (mimeType.match(/pdf\/*/) == null) {
            this.notifyService.error('Invalid file type, only pdf file allowed');
            this.learningareaForm.get('file1').reset();
            return false;
        }

        const reader = new FileReader();
        reader.readAsDataURL(this.fileData1);
        reader.onload = (_event) => {
            this.previewUrl1 = reader.result;
            this.learningareaForm.get('media_path').setValue(this.previewUrl1);
            this.showUrl = false;
        };
    }

    private getGrades() {
        this.learningareaService.getGradesDropdown()
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.grades = res.data.grades;
                } else {
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private getCategories() {
        this.learningareaService.getResourceCategoriesDropdown()
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.categories = res.data.categories;
                } else {
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

}
