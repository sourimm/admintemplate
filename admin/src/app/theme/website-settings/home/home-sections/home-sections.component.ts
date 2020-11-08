import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../../services/notify.service";
import {SectionService} from "../../../../services/section.service";
import {ApiResponse} from "../../../../models/ApiResponse";
import swal from 'sweetalert2';

@Component({
  selector: 'app-home-sections',
  templateUrl: './home-sections.component.html',
  styleUrls: ['./home-sections.component.scss']
})
export class HomeSectionsComponent implements OnInit {

    loading = true;

    sections = [];

    message = '';

    flags = false;

    page = 'home';
    section_id = '';
    order = 0;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private sectionService: SectionService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.flags = false;
        this.order = 0;
        this.section_id = '';
        this.getSections();
    }

    private getSections() {
        this.sections = [];

        this.loading = true;

        const data = {
            'page': this.page,
        };

        this.sectionService.PageSectionListing(data)
            .then(
                (res: ApiResponse) => {
                    if (res.status === true) {
                        this.loading = true;
                        this.sections = res.data.result;
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

    updateSectionModal(id, order) {
        this.order = +order;
        this.flags = !this.flags;
        this.section_id = id;
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
                this.sectionService.deleteSection(id)
                    .then((res: ApiResponse) => {
                        if (res.status === true) {
                            this.notifyService.success(res.message);
                            this.getSections();
                        } else {
                            this.notifyService.error(res.message);
                        }
                    })
                    .catch((error: any) => {});
            }
        });
    }


}
