import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../services/notify.service";
import swal from 'sweetalert2';
import {ApiResponse} from "../../../models/ApiResponse";
import {LessonService} from "../../../services/lesson.service";

@Component({
  selector: 'app-list-lessons',
  templateUrl: './list-lessons.component.html',
  styleUrls: ['./list-lessons.component.scss']
})
export class ListLessonsComponent implements OnInit {

    loading = true;

    totalRecords = 0;
    page_no = 1;
    page_size = 10;
    order = 'asc';
    order_by = 'id';
    keyword = '';

    lessons = [];
    lesson: any;

    message = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private lessonService: LessonService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.getLessonsListing();
    }

    onPageChange(e) {
        this.getLessonsListing();
    }

    filter() {
        this.getLessonsListing();
    }

    reset() {
        this.keyword = '';
        this.getLessonsListing();
    }

    private getLessonsListing() {
        this.lessons = [];

        this.lessonService.LessonListing(
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
                        this.lessons = res.data.result;
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
                this.lessonService.deleteLesson(id)
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


}
