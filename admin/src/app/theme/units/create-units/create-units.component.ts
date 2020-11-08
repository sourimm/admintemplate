import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitService} from "../../../services/unit.service";
import {NotifyService} from "../../../services/notify.service";
import {ApiResponse} from "../../../models/ApiResponse";

@Component({
  selector: 'app-create-units',
  templateUrl: './create-units.component.html',
  styleUrls: ['./create-units.component.scss']
})
export class CreateUnitsComponent implements OnInit {

    focusAreasDropdown = [];
    unitDataLoading = true;
    unitData: any;

    unitForm: FormGroup;
    formProcessing = false;

    validationErrors: any;

    message = '';

    id = 0;

    form_loading = true;

    pageTitle = 'Add Unit';

    learning_areas_list: FormArray;
    lessons_list: FormArray;

    grades: any;

    grade_pair_id = 0;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private unitService: UnitService,
              private fb: FormBuilder,
              private notifyService: NotifyService) { }

  ngOnInit() {
      const id = this.route.snapshot.params['id'];

      this.getGrades();

      if (typeof id !== 'undefined') {
          this.id = id;
      }

      if (this.id > 0) {
          this.pageTitle = 'Edit Unit';
          this.getUnitFormData(this.id);
      }
  }


    private getFocusAreasDropdown() {
        this.focusAreasDropdown = [];

        this.unitService.getFocusAreasDropdown()
            .then(
                (res: ApiResponse) => {
                    if (res.status === true) {
                        this.focusAreasDropdown = res.data.focus_areas;
                        this.message = res.message;
                    } else {
                        this.notifyService.error(res.message);
                    }
                }
            )
            .catch((error: any) => {
                this.notifyService.error(error);
            });
    }

    getUnitFormData(id = 0, grade_pair_id = 0) {

        this.id = id;
        this.grade_pair_id = grade_pair_id;

        this.unitService.getUnitFormData(this.id, this.grade_pair_id)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.unitData = res.data.unit;
                    this.grade_pair_id = this.unitData.grade_pair_id;
                    this.unitDataLoading = false;
                    this.getFocusAreasDropdown();
                    this.initForm();


                    if (this.unitData.learning_areas.length > 0) {
                        for (let lr_index in this.unitData.learning_areas) {
                            const learningar = this.unitData.learning_areas[lr_index];
                            this.addNewLearningArea(learningar.id, learningar.title, learningar.checked, learningar.lessons, +lr_index);
                        }
                    }


                    this.form_loading = false;
                } else {
                    this.router.navigate(['focus-areas/list']);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private initForm() {
        const data = this.unitData;

        this.unitForm = new FormGroup({
            'id': new FormControl(data.id),
            'title': new FormControl(data.title),
            'description': new FormControl(data.description),
            'no_of_weeks': new FormControl(data.no_of_weeks),
            'lessons_per_week': new FormControl(data.lessons_per_week),
            'focus_areas': new FormControl(data.focus_areas),
            'grade_pair_id': new FormControl(data.grade_pair_id),
            'learning_areas_list': this.fb.array([]),
        });
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.unitForm.getRawValue();

        let learningArea = '';
        if (formData.focus_areas.length > 0) {
          learningArea = JSON.stringify(formData.learning_areas_list);
        }

        let focusArea = '';
        if (formData.focus_areas.length > 0) {
          focusArea = JSON.stringify(formData.focus_areas);
        }

        const data = {
            'id': formData.id,
            'title': formData.title,
            'description': formData.description,
            'no_of_weeks': formData.no_of_weeks,
            'lessons_per_week': formData.lessons_per_week,
            'learning_areas': learningArea,
            'focus_areas': focusArea,
            'grade_pair_id': formData.grade_pair_id,
        };

        this.unitService.submitUnitForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.initForm();
                    this.formProcessing = false;
                    this.router.navigate(['units/list']);
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

    createLearningArea(id= '', title = '', checked = false) {
        return this.fb.group({
            id: id,
            title: title,
            checked: checked,
            lessons_list: this.fb.array([])
        });
    }

    addNewLearningArea(id = '', title = '', checked = false, lessons = [], learning_area_index = 0) {
        this.learning_areas_list = this.unitForm.get('learning_areas_list') as FormArray;
        this.learning_areas_list.push(this.createLearningArea(id, title, checked));

        if (lessons.length > 0) {
            for (let lesson of lessons) {
                this.addNewLessons(lesson.id, lesson.name, lesson.checked, +learning_area_index);
            }
        }
    }

    private getGrades() {
        this.unitService.getGradesDropdown()
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

    createLessons(id = '', title = '', checked = false) {
        return this.fb.group({
            id: id,
            title: title,
            checked: checked,
        });
    }

    addNewLessons(id = '', title = '', checked = false, learning_area_index = 0) {
        this.lessons_list = (<FormArray>this.unitForm.controls['learning_areas_list']).at(learning_area_index).get('lessons_list') as FormArray;
        this.lessons_list.push(this.createLessons(id, title, checked));
    }
}
