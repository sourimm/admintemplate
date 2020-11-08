import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifyService} from '../../../services/notify.service';
import {ApiResponse} from '../../../models/ApiResponse';
import {OutcomeService} from '../../../services/outcome.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-outcome-list',
  templateUrl: './outcome-list.component.html',
  styleUrls: ['./outcome-list.component.scss']
})
export class OutcomeListComponent implements OnInit {

  loading = true;

  id = 0;

  totalRecords = 0;
  page_no = 1;
  page_size = 10;
  order = 'asc';
  order_by = 'id';
  keyword = '';

  outcomes = [];

  message = '';

  @ViewChild('modalLarge') private modalLarge;
  addModalLarge = false;
  outcomeDataLoading = true;
  outcomeData: any;

  outcomeForm: FormGroup;
  formProcessing = false;

  validationErrors: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private outcomeService: OutcomeService,
              private notifyService: NotifyService) { }

  ngOnInit() {
    this.getOutcomeListing();
  }

  onPageChange(e) {
    this.getOutcomeListing();
  }

  filter() {
    this.getOutcomeListing();
  }

  reset() {
    this.keyword = '';
    this.getOutcomeListing();
  }

  private getOutcomeListing() {
    this.outcomes = [];

    this.loading = true;

    this.outcomeService.getListing(
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
            this.outcomes = res.data.result;
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
        this.outcomeService.deleteData(id)
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


  getOutcomeFormData(id = 0) {
    this.validationErrors = {};
    this.id = id;

    this.addModalLarge = true;
    setTimeout(() => {
      this.modalLarge.show();
    }, 100);

    this.outcomeService.getFormData(this.id)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.outcomeData = res.data.outcome;
          this.outcomeDataLoading = false;
          this.initForm();
        } else {
          this.router.navigate(['focus-areas/list']);
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {
      });
  }

  private initForm() {
    const data = this.outcomeData;

    this.outcomeForm = new FormGroup({
      'id': new FormControl(data.id),
      'code': new FormControl(data.code),
      'description': new FormControl(data.description),
    });
  }

  submit() {
    this.formProcessing = true;
    this.validationErrors = {};

    const formData = this.outcomeForm.getRawValue();

    const data = {
      'id': formData.id,
      'code': formData.code,
      'description': formData.description,
    };

    this.outcomeService.submitFormData(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.initForm();
          setTimeout(() => {
            this.modalLarge.hide();
          }, 100);
          this.addModalLarge = false;
          this.formProcessing = false;
          this.getOutcomeListing();
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
