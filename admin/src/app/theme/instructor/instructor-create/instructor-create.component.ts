import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {InstructorService} from "../../../services/instructor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../services/notify.service";
import {ApiResponse} from "../../../models/ApiResponse";

@Component({
  selector: 'app-instructor-create',
  templateUrl: './instructor-create.component.html',
  styleUrls: ['./instructor-create.component.scss']
})
export class InstructorCreateComponent implements OnInit {

    instructorForm: FormGroup;

    id = 0;

    form_loading = true;
    formProcessing = false;

    pageTitle = 'Add Instructor';
    instructorData: any;
    validationErrors: any;
	schooleditId : number = 0;

    schools = [];

    constructor(private instructorService: InstructorService,
                private route: ActivatedRoute,
                private router: Router,
                private notifyService: NotifyService) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (typeof id !== 'undefined') {
            this.id = id;
        }

        if (this.id > 0) {
            this.pageTitle = 'Edit Instructor';
        }

        this.getFormData(this.id);
    }

    private getFormData(id) {

        this.getSchools();

        this.instructorService.getInstructorFormData(id)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.instructorData = res.data.instructor; 
					this.schooleditId = this.instructorData.school_id;
                    this.initForm();
                    this.form_loading = false;
                } else {
                    this.router.navigate(['instructor/add']);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private getSchools() {

        this.instructorService.getSchoolsDropdown()
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.schools = res.data.schools_dropdown;
                } else {
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
            'school_id': new FormControl(data.school_id),
            'email': new FormControl(data.email),
            'password': new FormControl(''),
            'conf_password': new FormControl(''),
            'teacher_student_no': new FormControl(data.teacher_student_no),
        });
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.instructorForm.getRawValue();
		var school_id = formData.school_id.split('_');
		//console.log(school_id[0]); 
		
        const data = {
            'id': formData.id,
            'first_name': formData.first_name,
            'last_name': formData.last_name,
            'user_name': formData.user_name,
            'school_id': school_id[0],
            'email': formData.email,
            'password': formData.password,
            'conf_password': formData.conf_password,
			'teacher_student_no': formData.teacher_student_no,
        };

        this.instructorService.submitInstructorForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.initForm();
                    this.router.navigate(['instructor/list']);
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
	
	 private getInstructorSchoolWise(schoolId) { 
	 
		var school_id = schoolId.split('_');
		
		 const data = {
            'id': school_id[0], 
            'teacher_count': school_id[1]
        };
		
		
        this.instructorService.getInstructorSchoolWise(data)
            .then((res: ApiResponse) => {
                if (res.status === false)   {
					this.instructorForm.get("school_id").setValue([]);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }
	
	
	public changeSchool(value){
		var school_id = value.split('_');
		
		if(this.schooleditId>0){
			if(this.schooleditId!=school_id[0]){
				this.getInstructorSchoolWise(value);
			}				
		}
		else{
				this.getInstructorSchoolWise(value);
		}
		
	}

}
