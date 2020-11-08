import { Component, OnInit } from '@angular/core';
import {ApiResponse} from '../../../models/ApiResponse';
import {NotifyService} from '../../../services/notify.service';
import {AgentService} from '../../../services/agent.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  loading = true;

  totalRecords = 0;
  page_no = 1;
  page_size = 10;
  order = 'desc';
  order_by = 'user_id';
  keyword = '';

  agents = [];
  agent: any;

  message = '';

  loadModal = false;

  constructor(private agentService: AgentService,
              private notifyService: NotifyService) { }

  ngOnInit() {
    this.getAgentListing();
  }

  onPageChange(e) {
    this.getAgentListing();
  }

  filter() {
    this.getAgentListing();
  }

  reset() {
    this.keyword = '';

    this.getAgentListing();
  }

  private getAgentListing() {
    this.agents = [];

    this.agentService.AgentListing(
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
            this.agents = res.data.result;
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
        this.agentService.deleteAgent(id)
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
