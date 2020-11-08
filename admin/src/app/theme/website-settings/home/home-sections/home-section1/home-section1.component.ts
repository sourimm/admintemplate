import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SectionService} from "../../../../../services/section.service";
import {NotifyService} from "../../../../../services/notify.service";
import {ApiResponse} from "../../../../../models/ApiResponse";

@Component({
  selector: 'app-home-section1',
  templateUrl: './home-section1.component.html',
  styleUrls: ['./home-section1.component.scss']
})
export class HomeSection1Component implements OnInit, OnChanges {

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
            'sub_heading_1': new FormControl(data.sub_heading_1),
            'sub_description_1': new FormControl(data.sub_description_1),
            'sub_description_2': new FormControl(data.sub_description_2),
            'button_1_text': new FormControl(data.button_1_text),
            'button_1_url': new FormControl(data.button_1_url),
            'button_2_text': new FormControl(data.button_2_text),
            'button_2_url': new FormControl(data.button_2_url),
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
            'sub_heading_1': formData.sub_heading_1,
            'sub_description_1': formData.sub_description_1,
            'sub_description_2': formData.sub_description_2,
            'button_1_text': formData.button_1_text,
            'button_1_url': formData.button_1_url,
            'button_2_text': formData.button_2_text,
            'button_2_url': formData.button_2_url,
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
