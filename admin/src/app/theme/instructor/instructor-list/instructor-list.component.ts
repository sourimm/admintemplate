import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {InstructorService} from "../../../services/instructor.service";
import {NotifyService} from "../../../services/notify.service";
import {ApiResponse} from "../../../models/ApiResponse";

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss']
})
export class InstructorListComponent implements OnInit {

    loading = true;

    totalRecords = 0;
    page_no = 1;
    page_size = 10;
    order = 'desc';
    order_by = 'user_id';
    keyword = '';

    instructors = [];
    instructor: any;

    message = '';

    loadModal = false;

    constructor(private instructorService: InstructorService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        console.log("Here");
        this.getInstructorListing();
    }

    onPageChange(e) {
        this.getInstructorListing();
    }

    filter() {
        this.getInstructorListing();
    }

    reset() {
        this.keyword = '';

        this.getInstructorListing();
    }

    private getInstructorListing() {
        this.instructors = [];

        this.instructorService.InstructorListing(
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
                        this.instructors = res.data.result;
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
                this.instructorService.deleteInstructor(id)
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
