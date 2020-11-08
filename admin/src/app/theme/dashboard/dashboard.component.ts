import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../../services/notify.service';
import {ApiResponse} from '../../models/ApiResponse';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private notifyService: NotifyService) { }

  ngOnInit() {
  }
}
