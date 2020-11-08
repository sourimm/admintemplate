import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApiResponse} from "../../../../../models/ApiResponse";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SectionService} from "../../../../../services/section.service";
import {NotifyService} from "../../../../../services/notify.service";

@Component({
  selector: 'app-what-we-do-section1',
  templateUrl: './what-we-do-section1.component.html',
  styleUrls: ['./what-we-do-section1.component.scss']
})
export class WhatWeDoSection1Component implements OnInit {

    @Input() flags = false;
    @Input() page: any;
    @Input() section_id: any;
    @Input() order: any;
    @Output() isSuccessed = new EventEmitter<boolean>();

    id = 0;

    @ViewChild('modalLarge') private modalLarge;
    addModalLarge = false;
    sectionDataLoading = true;
    sectionData: any;

    sectionForm: FormGroup;
    formProcessing = false;

    validationErrors: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private sectionService: SectionService,
                private notifyService: NotifyService) { }

    ngOnInit() {

    }

    ngOnChanges() {
        this.id = this.section_id;
        this.getSectionFormData(this.id);
    }

    getSectionFormData(id = 0) {
        this.id = id;

        this.addModalLarge = true;
        setTimeout(() => {
            this.modalLarge.show();
        }, 100);


        this.sectionService.getPageSectionFormData(this.id, this.page, this.order)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.sectionData = res.data.section;
                    this.sectionDataLoading = false;
                    this.initForm();

                } else {
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private initForm() {
        const data = this.sectionData;

        this.sectionForm = new FormGroup({
            'id': new FormControl(data.id),
            'page': new FormControl(data.page),
            'heading_line_1': new FormControl(data.heading_line_1),
            'heading_line_2': new FormControl(data.heading_line_2),
            'description_1': new FormControl(data.description_1),
            'button_1_text': new FormControl(data.button_1_text),
            'button_1_url': new FormControl(data.button_1_url),
            'order': new FormControl(data.order),
            'media_path': new FormControl(data.media_path),
        });
    }

    submit() {
        // this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.sectionForm.getRawValue();

        const data = {
            'id': formData.id,
            'page': formData.page,
            'heading_line_1': formData.heading_line_1,
            'heading_line_2': formData.heading_line_2,
            'description_1': formData.description_1,
            'button_1_text': formData.button_1_text,
            'button_1_url': formData.button_1_url,
            'media_path': formData.media_path,
            'media_type': 'video/link',
            'order': formData.order,
        };

        this.sectionService.submitPageSectionForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.initForm();
                    setTimeout(() => {
                        this.modalLarge.hide();
                    }, 100);
                    this.addModalLarge = false;
                    this.isSuccessed.emit(true);
                } else {
                    this.formProcessing = false;
                    this.notifyService.error(res.message);
                    this.isSuccessed.emit(false);
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
