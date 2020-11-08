import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../services/notify.service";
import {FormControl, FormGroup} from "@angular/forms";
import swal from 'sweetalert2';
import {UnitService} from "../../../services/unit.service";
import {ApiResponse} from "../../../models/ApiResponse";

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.scss']
})
export class ListUnitsComponent implements OnInit {

    loading = true;

    id = 0;

    totalRecords = 0;
    page_no = 1;
    page_size = 10;
    order = 'asc';
    order_by = 'id';
    keyword = '';

    units = [];

    message = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private unitService: UnitService,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.getUnitListing();
    }

    onPageChange(e) {
        this.getUnitListing();
    }

    filter() {
        this.getUnitListing();
    }

    reset() {
        this.keyword = '';
        this.getUnitListing();
    }

    private getUnitListing() {
        this.units = [];

        this.loading = true;

        this.unitService.UnitListing(
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
                        this.units = res.data.result;
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
                this.unitService.deleteUnit(id)
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
