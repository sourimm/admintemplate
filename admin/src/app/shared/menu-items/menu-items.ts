import {Injectable} from '@angular/core';
import {UserService} from '../../services/user.service';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: '',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'fa fa-home'
      },
      {
        state: 'agent',
        short_label: 'A',
        name: 'Agents',
        type: 'sub',
        icon: 'fa fa-users',
        children: [
          {
            state: 'add',
            name: 'Add New'
          },
          {
            state: 'list',
            name: 'View All',
          },
        ]
      },
      {
        state: 'school',
        short_label: 'S',
        name: 'Schools',
        type: 'sub',
        icon: 'fa fa-users',
        children: [
          {
            state: 'add',
            name: 'Add New'
          },
          {
            state: 'list',
            name: 'View All',
          },
        ]
      },
      {
        state: 'instructor',
        short_label: 'I',
        name: 'Instructors',
        type: 'sub',
        icon: 'fa fa-users',
        children: [
          {
            state: 'add',
            name: 'Add New'
          },
          {
            state: 'list',
            name: 'View All',
          },
        ]
      },
      {
        state: 'learning-areas',
        short_label: 'FA',
        name: 'Learning Areas',
        type: 'link',
        icon: 'fa fa-home'
      },
      {
        state: 'focus-areas',
        short_label: 'FA',
        name: 'Focus Areas',
        type: 'link',
        icon: 'fa fa-home'
      },
      {
        state: 'lesson-outcome',
        short_label: 'LO',
        name: 'Lesson Outcome',
        type: 'link',
        icon: 'fa fa-list'
      },
      {
        state: 'lessons',
        short_label: 'L',
        name: 'Lessons',
        type: 'sub',
        icon: 'fa fa-home',
        children: [
          {
            state: 'list',
            name: 'List'
          },
          {
            state: 'add',
            name: 'Add New'
          }
        ]
      },
      {
        state: 'units',
        short_label: 'FA',
        name: 'Units',
        type: 'sub',
        icon: 'fa fa-home',
        children: [
          {
            state: 'list',
            name: 'List'
          },
          {
            state: 'add',
            name: 'Add New'
          }
        ]
      },
      {
        state: 'website',
        short_label: 'A',
        name: 'Website Settings',
        type: 'sub',
        icon: 'fa fa-gear',
        children: [
          {
            state: 'home',
            name: 'Home Page'
          },
          {
            state: 'what-we-do',
            name: 'What We Do Page'
          },
          {
            state: 'more-from-us',
            name: 'More From Us Page'
          },
          {
            state: 'footer-section',
            name: 'Footer Section'
          },
        ]
      },
      {
        state: 'file-manager',
        short_label: 'FM',
        name: 'File Manager',
        type: 'link',
        icon: 'fa fa-folder',
      },
      {
        state: 'classroom-resources',
        short_label: 'A',
        name: 'Classroom Resources',
        type: 'sub',
        icon: 'fa fa-folder',
        children: [
          {
            state: 'brain-breaks',
            name: 'Brain Breaks'
          },
          {
            state: 'guided-breathing',
            name: 'Guided Breathing'
          },
          {
            state: 'guided-visualizations',
            name: 'Guided Visualizations'
          },
          {
            state: 'mindful-exercises',
            name: 'Mindful Exercises'
          },
          {
            state: 'printable-resources',
            name: 'Printable Resources'
          },
          {
            state: 'printable-resources-categories',
            name: 'Printable Resources Categories'
          },
          {
            state: 'relaxation-stories',
            name: 'Relaxation Stories'
          },
        ]
      },
      {
        state: 'teacher-resources',
        short_label: 'TR',
        name: 'Teacher Resources',
        type: 'sub',
        icon: 'fa fa-folder',
        children: [
          {
            state: 'teacher-wellbeing',
            name: 'Teacher Wellbeing'
          },
        ]
      },
      {
        state: 'weather-report',
        short_label: 'WR',
        name: 'Weather Report',
        type: 'link',
        icon: 'fa fa-list'
      },
      {
        state: 'curriculum-map',
        short_label: 'CM',
        name: 'Curriculum Map',
        type: 'link',
        icon: 'fa fa-list'
      },
      {
        state: 'help',
        short_label: 'H',
        name: 'Help',
        type: 'sub',
        icon: 'fa fa-folder',
        children: [
          {
            state: 'categories',
            name: 'Help Categories'
          },
          {
            state: 'article/list',
            name: 'List Article'
          },
          {
            state: 'article/add',
            name: 'Add New Article'
          },
        ]
      },
      {
        state: 'demo-request',
        short_label: 'A',
        name: 'Demo Requests List',
        type: 'link',
        icon: 'fa fa-book',
      },
    ]
  }
];

const ContentMenuItems = [
  {
    label: '',
    main: [
      {
        state: 'website',
        short_label: 'A',
        name: 'Website Settings',
        type: 'sub',
        icon: 'fa fa-gear',
        children: [
          {
            state: 'home',
            name: 'Home Page'
          }
        ]
      },
    ]
  }
];


@Injectable()
export class MenuItems {

  constructor(private userService: UserService) {}

  getAll(): Menu[] {
    return this.userService.menuItems;
    // if (this.userService.userType === '1') {
    //   return MENUITEMS;
    // } else if (this.userService.userType === '4') {
    //   return ContentMenuItems;
    // }
    // return MENUITEMS;
  }
}
