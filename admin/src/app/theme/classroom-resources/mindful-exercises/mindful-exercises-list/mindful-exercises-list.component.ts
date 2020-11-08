import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifyService} from '../../../../services/notify.service';
import {ApiResponse} from '../../../../models/ApiResponse';
import swal from 'sweetalert2';
import {MindfulExercisesService} from '../../../../services/mindful-exercises.service';

@Component({
  selector: 'app-mindful-exercises-list',
  templateUrl: './mindful-exercises-list.component.html',
  styleUrls: ['./mindful-exercises-list.component.scss']
})
export class MindfulExercisesListComponent implements OnInit {

    loading = true;

    id = 0;

    totalRecords = 0;
    page_no = 1;
    page_size = 10;
    order = 'asc';
    order_by = 'id';
    keyword = '';

    mindfulexercises = [];

    message = '';

    @ViewChild('modalLarge') private modalLarge;
    addModalLarge = false;
    mindfulexerciseDataLoading = true;
    mindfulexerciseData: any;

    mindfulexerciseForm: FormGroup;
    formProcessing = false;

    validationErrors: any;

    fileData: File = null;
    previewUrl: any = null;

    edit = false;

    grades = [];
    showUrl = true;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private mindfulexerciseService: MindfulExercisesService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.getMindfulExercisesListing();
    }

    onPageChange(e) {
        this.getMindfulExercisesListing();
    }

    filter() {
        this.getMindfulExercisesListing();
    }

    reset() {
        this.keyword = '';

        this.getMindfulExercisesListing();
    }

    private getMindfulExercisesListing() {
        this.mindfulexercises = [];


        this.loading = true;

        this.mindfulexerciseService.MindfulExercisesListing(
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
                        this.mindfulexercises = res.data.result;
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

    private getGrades() {
        this.mindfulexerciseService.getGradesDropdown()
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
                this.mindfulexerciseService.deleteMindfulExercises(id)
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

    getMindfulExercisesFormData(id = 0) {
        this.validationErrors = {};
        this.id = id;

        this.getGrades();
        this.fileData = null;
        this.previewUrl = null;
        this.showUrl = true;

        this.addModalLarge = true;
        setTimeout(() => {
            this.modalLarge.show();
        }, 100);

        this.mindfulexerciseService.getMindfulExercisesFormData(this.id)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.mindfulexerciseData = res.data.mindfulexercises;

                    this.initForm();

                    if (id > 0) {
                        this.edit = true;
                    } else {
                        this.edit = false;
                    }

                    this.mindfulexerciseDataLoading = false;

                } else {
                    this.router.navigate(['learning-area/list']);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private initForm() {
        const data = this.mindfulexerciseData;

        this.mindfulexerciseForm = new FormGroup({
            'id': new FormControl(data.id),
            'title': new FormControl(data.title),
            'grade_pair_id': new FormControl(data.grade_pair_id),
            'video': new FormControl(''),
            'file': new FormControl(''),
            'file1': new FormControl(''),
            'preview_image': new FormControl(''),
        });
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.mindfulexerciseForm.getRawValue();

        const data = {
            'id': formData.id,
            'title': formData.title,
            'grade_pair_id': formData.grade_pair_id,
            'video': encodeURI(formData.video),
            'preview_image': encodeURI(formData.preview_image),
        };

        this.mindfulexerciseService.submitMindfulExercisesForm(data)
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
                    this.getMindfulExercisesListing();
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
        this.showUrl = true;
        this.preview();
    }

    preview() {
        // Show preview
        const mimeType = this.fileData.type;
        if (mimeType.match(/video\/*/) == null) {
            this.notifyService.error('Invalid file type, only mp4 file allowed');
            this.mindfulexerciseForm.get('file').reset();
            return false;
        }

        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
            // this.previewUrl = reader.result;
            this.mindfulexerciseForm.get('video').setValue(reader.result);
            this.showUrl = false;
        };
    }

  fileProgress1(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.edit = false;
    this.preview1();
  }

  preview1() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      this.notifyService.error('Invalid file type, only jpeg, jpg or png file allowed');
      this.mindfulexerciseForm.get('file1').reset();
      return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.mindfulexerciseForm.get('preview_image').setValue(this.previewUrl);
    };
  }

}