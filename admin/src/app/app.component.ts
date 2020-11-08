import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EduoSEL Value';

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const roles = this.userService.accessRoles;
      if ((evt.url.indexOf('school') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'schools') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('instructor') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'instructors') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('learning-areas') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'learning_areas') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('focus-areas') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'focus_areas') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('lesson-outcome') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'lesson_outcomes') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('lessons') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'lessons') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('units') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'units') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('website') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'website_settings') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('file-manager') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'file_manager') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('classroom-resources') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'classroom_resources') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('teacher-resources') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'teacher_resources') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('weather-report') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'weather_report') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('curriculum-map') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'curriculum_map') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('help') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'help') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      if ((evt.url.indexOf('demo-request') !== -1) === true) {
        for (let a = 0; a < roles.length; a++) {
          if ((roles[a].value === 'demo_requests_list') && (roles[a].checked === false)) {
            this.router.navigate(['/login']);
          }
        }
      }
      window.scrollTo(0, 0);
    });
  }
}
