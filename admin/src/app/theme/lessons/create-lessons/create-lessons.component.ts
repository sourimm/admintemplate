import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifyService} from '../../../services/notify.service';
import {ApiResponse} from '../../../models/ApiResponse';
import {LessonService} from '../../../services/lesson.service';
import {UnitService} from '../../../services/unit.service';

@Component({
  selector: 'app-create-lessons',
  templateUrl: './create-lessons.component.html',
  styleUrls: ['./create-lessons.component.scss']
})
export class CreateLessonsComponent implements OnInit {

    lessonForm: FormGroup;

    id = 0;

    module_id = 0;

    activities: FormArray;
    questions: FormArray;
    options: FormArray;

    form_loading = true;
    formProcessing = false;

    pageTitle = 'Add Lesson';
    lessonData: any;
    lessonActivities = [];

    validationErrors: any;

    questionArray = [];

    focusAreasDropdown = [];
    categoriesDropdown = [];
    outcomesDropdown = [];

    selectedOutcomes = [];

    grades = [];
    learning_areas = [];

    constructor(private lessonService: LessonService,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private unitService: UnitService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];

        if (typeof id !== 'undefined') {
            this.id = id;
        }

        if (this.id > 0) {
            this.pageTitle = 'Edit Lesson';
        }

        this.getFormData(this.id);
    }

    private getFormData(id) {

        this.getGrades();
        this.getLearningAreas();
        this.getFocusAreasDropdown();
        this.getCategoriesDropdown();

        this.lessonService.getLessonFormData(id)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.lessonData = res.data.lesson;
                    this.lessonActivities = res.data.lesson_activities;
                    this.outcomesDropdown = res.data.outcomes_dropdown;
                    this.selectedOutcomes = res.data.selected_outcomes;
                    this.initForm();

                    this.questionArray = [];

                    if (this.lessonActivities.length === 0) {
                        this.addNewActivity();
                    } else {
                        for (let activity_index in this.lessonActivities) {
                            const activity = this.lessonActivities[activity_index];
                            this.addNewActivity(activity.id, activity.title, activity.questions, +activity_index);
                        }
                    }

                    this.form_loading = false;
                    setTimeout(() => {
                      console.log(this.lessonForm.getRawValue());
                    }, 5000);
                } else {
                    this.router.navigate(['lesson/add']);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private getGrades() {
        this.lessonService.getGradesDropdown()
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

    private getLearningAreas() {
        this.lessonService.getLearningAreasDropdown()
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.learning_areas = res.data.learning_areas;
                } else {
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private initForm() {
        const data = this.lessonData;

        this.lessonForm = new FormGroup({
            'id': new FormControl(data.id),
            'name': new FormControl(data.name),
            'outcome': new FormControl(data.outcome),
            'learning_area': new FormControl(data.learning_area),
            'grade_pair': new FormControl(data.grade_pair),
            'focus_area_id': new FormControl(data.focus_area_id),
            'lesson_activities': this.fb.array([])
        });
    }

    checkOptions(question_index, activity_index, value) {

        if (value !== 'video' && value !== 'text' && value !== 'paint' && value !== 'game') {
            let fg = (<FormArray>this.lessonForm.controls['lesson_activities']).at(activity_index) as FormGroup;
            let opt_fg = (<FormArray>fg.controls['questions_list']).at(question_index) as FormGroup;
            let opt_opt_fg = opt_fg.controls['options_list'] as FormGroup;

            if (!opt_opt_fg.controls.length) {

                this.addNewOption('', '', '', '', activity_index, question_index);
            }

            this.questionArray[activity_index][question_index] = 'options';
        } else if(value === 'video'){
            this.questionArray[activity_index][question_index] = 'video';
        } else if(value === 'text'){
            this.questionArray[activity_index][question_index] = 'text';
        } else if(value === 'paint'){
            this.questionArray[activity_index][question_index] = 'paint';
        } else if(value === 'game'){
            this.questionArray[activity_index][question_index] = 'game';
        }
    }

    createActivity(id= '', title = '', questions = []) {
        return this.fb.group({
            id: id,
            title: title,
            questions_list: this.fb.array([])
        });
    }

    addNewActivity(id = '', title = '', questions = [], activity_index = 0) {
        this.activities = this.lessonForm.get('lesson_activities') as FormArray;
        this.activities.push(this.createActivity(id, title, questions));

        this.questionArray.push([]);

        if (questions.length === 0) {
            let activity_count = this.activities.length;
            this.addNewQuestion('', '', '', [], activity_count-1);
        } else {
          let i = -1;
            for (let question of questions) {
                i++;
                this.addNewQuestion(question.id, question.title, question.type, question.options, +activity_index, i, question.answer, question.category_id);
            }
        }
    }

    deleteActivity(index) {
        (<FormArray>this.lessonForm.get('lesson_activities')).removeAt(index);
        const form_detail = this.lessonForm.get('lesson_activities') as FormArray;
        if (form_detail.length === 0) {
            this.questionArray.splice(index, 1);
            this.addNewActivity();
        }
    }

    createQuestion(id = '', title = '', type ='', answer = '', category_id = '') {
      console.log(category_id);

        if(type === ''){
            type = 'text';
        }
        return this.fb.group({
            id: id,
            title: title,
            type: type,
            answer: answer,
            category_id: new FormControl(category_id),
            options_list: this.fb.array([])
        });
    }

    addNewQuestion(id = '', title = '', type = '', options = [], activity_index = 0, question_index = 0, answer = '', category_id = '') {
        this.questions = (<FormArray>this.lessonForm.controls['lesson_activities']).at(activity_index).get('questions_list') as FormArray;
        this.questions.push(this.createQuestion(id, title, type, answer, category_id));

        if (type !== 'video' && type !== '' && type !== 'paint' && type !== 'game' && type !== 'text') {
            this.questionArray[activity_index].push(true);
            if (options.length === 0) {
                this.addNewOption('', '', '', '', activity_index, question_index);
            } else {
                for (let option of options) {
                    this.addNewOption(option.id, option.title, option.is_correct, option.is_picture, activity_index, question_index);
                }
            }
            this.questionArray[activity_index][question_index] = 'options';
        } else if(type === 'video') {
            this.questionArray[activity_index][question_index] = 'video';
        } else if(type === 'text') {
            this.questionArray[activity_index][question_index] = 'text';
        } else if(type === 'game') {
            this.questionArray[activity_index][question_index] = 'game';
        } else if(type === 'paint') {
            this.questionArray[activity_index][question_index] = 'paint';
        } else {
            this.questionArray[activity_index].push(false);
        }
    }

    deleteQuestion(question_index, activity, activity_index) {
        (<FormArray>activity.get('questions_list')).removeAt(question_index);
        this.questionArray[activity_index].splice(question_index, 1);
        const form_detail_delete = (<FormArray>this.lessonForm.controls['lesson_activities']).at(activity_index).get('questions_list') as FormArray;
        if (form_detail_delete.length === 0) {
            this.addNewQuestion('', '', '', [], activity_index);
        }
    }

    createOption(id = '', title = '', is_correct = '', is_picture = '') {
        return this.fb.group({
            id: id,
            title: title,
            is_correct: is_correct,
            is_picture: is_picture,
        });
    }

    addNewOption(id = '', title = '', is_correct = '', is_picture = '', activity_index = 0, question_index = 0) {
        this.options = (<FormArray>this.lessonForm.controls['lesson_activities']).at(activity_index) as FormArray;
        this.options = (<FormArray>this.options.controls['questions_list']).at(question_index).get('options_list') as FormArray;
        this.options.push(this.createOption(id, title, is_correct, is_picture));
    }

    deleteOption(index, question, parent_index, parent_parent_index) {
        (<FormArray>question.get('options_list')).removeAt(index);
        const form_detail_delete = (<FormArray>this.lessonForm.controls['questions_list']).at(parent_index).get('options_list') as FormArray;
        if (form_detail_delete.length === 0) {
            this.addNewOption();
        }
    }

    submit() {
        this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.lessonForm.getRawValue();

        let outcomes = '';
        if (this.selectedOutcomes.length > 0) {
          outcomes = JSON.stringify(this.selectedOutcomes);
        }

        const data = {
            'id': formData.id,
            'name': formData.name,
            'outcome': formData.outcome,
            'learning_area': formData.learning_area,
            'grade_pair': formData.grade_pair,
            'focus_area_id': formData.focus_area_id,
            'lesson_activities': JSON.stringify(formData.lesson_activities),
            'selected_outcomes': outcomes,
        };

        this.lessonService.submitLessonForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.initForm();
                    this.router.navigate(['lessons/list']);
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

    private getFocusAreasDropdown() {
        this.focusAreasDropdown = [];

        this.unitService.getFocusAreasDropdown()
            .then(
                (res: ApiResponse) => {
                    if (res.status === true) {
                        this.focusAreasDropdown = res.data.focus_areas;
                    } else {
                        this.notifyService.error(res.message);
                    }
                }
            )
            .catch((error: any) => {
                this.notifyService.error(error);
            });
    }

    private getCategoriesDropdown() {
        this.categoriesDropdown = [];

        this.unitService.getCategoriesDropdown()
            .then(
                (res: ApiResponse) => {
                    if (res.status === true) {
                        this.categoriesDropdown = res.data.categories;
                    } else {
                        this.notifyService.error(res.message);
                    }
                }
            )
            .catch((error: any) => {
                this.notifyService.error(error);
            });
    }

}
