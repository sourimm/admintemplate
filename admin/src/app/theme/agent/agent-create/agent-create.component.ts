import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../../../models/ApiResponse';
import {NotifyService} from '../../../services/notify.service';
import {AgentService} from '../../../services/agent.service';

@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.scss']
})
export class AgentCreateComponent implements OnInit {

  agentForm: FormGroup;

  id = 0;

  form_loading = true;
  formProcessing = false;

  pageTitle = 'Add Agent';
  agentData: any;
  validationErrors: any;

  schools = [];
  allChecked = false;
  access_roles = [];

  constructor(private agentService: AgentService,
              private route: ActivatedRoute,
              private router: Router,
              private notifyService: NotifyService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (typeof id !== 'undefined') {
      this.id = id;
    }

    if (this.id > 0) {
      this.pageTitle = 'Edit Agent';
    }

    this.getFormData(this.id);
  }

  private getFormData(id) {
    this.agentService.getAgentFormData(id)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.agentData = res.data.agent;
          this.access_roles = res.data.agent.access_roles;
          this.initForm();
        } else {
          this.router.navigate(['agent/add']);
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {
      });
  }

  private initForm() {
    const data = this.agentData;

    this.agentForm = new FormGroup({
      'id': new FormControl(data.id),
      'first_name': new FormControl(data.first_name),
      'last_name': new FormControl(data.last_name),
      'user_name': new FormControl(data.user_name),
      'school_id': new FormControl(data.school_id),
      'email': new FormControl(data.email),
      'password': new FormControl(''),
      'conf_password': new FormControl(''),
    });
    this.checkIfAllSelected();
    this.form_loading = false;
  }

  selectAll() {
    for (let i = 0; i < this.access_roles.length; i++) {
      this.access_roles[i].checked = this.allChecked;
    }
  }
  checkIfAllSelected() {
    this.allChecked = this.access_roles.every(function(item:any) {
      return item.checked === true;
    });
  }

  submit() {
    let count = 0;
    for (let i = 0; i < this.access_roles.length; i++) {
      if (this.access_roles[i].checked === true) {
        count++;
      }
    }
    if (count === 0) {
      this.notifyService.error('Select atleast 1 module');
      return false;
    }
    this.formProcessing = true;
    this.validationErrors = {};

    const formData = this.agentForm.getRawValue();

    const data = {
      'id': formData.id,
      'first_name': formData.first_name,
      'last_name': formData.last_name,
      'user_name': formData.user_name,
      'school_id': formData.school_id,
      'email': formData.email,
      'password': formData.password,
      'conf_password': formData.conf_password,
      'access_roles': JSON.stringify(this.access_roles),
    };

    this.agentService.submitAgentForm(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.initForm();
          this.router.navigate(['agent/list']);
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
