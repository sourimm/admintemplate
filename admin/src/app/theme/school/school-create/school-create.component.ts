import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {InstructorService} from "../../../services/instructor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../services/notify.service";
import {ApiResponse} from "../../../models/ApiResponse";
import {SchoolService} from "../../../services/school.service";

@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.scss']
})
export class SchoolCreateComponent implements OnInit {

    instructorForm: FormGroup;

    id = 0;

    form_loading = true;
    formProcessing = false;

    pageTitle = 'Add School';
    instructorData: any;
    validationErrors: any;

    constructor(private instructorService: SchoolService,
                private route: ActivatedRoute,
                private router: Router,
                private notifyService: NotifyService) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (typeof id !== 'undefined') {
            this.id = id;
        }

        if (this.id > 0) {
            this.pageTitle = 'Edit School';
        }

        this.getFormData(this.id);
    }

    private getFormData(id) {

        this.instructorService.getInstructorFormData(id) 
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.instructorData = res.data.instructor; 
					console.log(this.instructorData);
                    this.initForm();
                    this.form_loading = false;
                } else {
                    this.router.navigate(['school/add']);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private initForm() {
        const data = this.instructorData;

        this.instructorForm = new FormGroup({
            'id': new FormControl(data.id),
            'first_name': new FormControl(data.first_name),
            'last_name': new FormControl(data.last_name),
            'user_name': new FormControl(data.user_name),
            'email': new FormControl(data.email),
            'password': new FormControl(''),
            'conf_password': new FormControl(''),
            'school_seat': new FormControl(data.school_seat),
            'teacher_seat': new FormControl(data.teacher_seat),
            'stud_seat': new FormControl(data.stud_seat),
        });
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.instructorForm.getRawValue();

        const data = {
            'id': formData.id,
            'first_name': formData.first_name,
            'last_name': formData.last_name,
            'user_name': formData.user_name,
            'email': formData.email,
            'password': formData.password,
            'conf_password': formData.conf_password,
            'school_seat': formData.school_seat,
            'teacher_seat': formData.teacher_seat,
            'stud_seat': formData.stud_seat,
        };

        this.instructorService.submitInstructorForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.initForm();
                    this.router.navigate(['school/list']);
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
