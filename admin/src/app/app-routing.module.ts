import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import {AuthGuard} from './services/auth-guard.service';
import {ContentManagerGuard} from './services/content-manager-guard.service';
import {SuperAdminGuard} from './services/super-admin-guard.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: '',
        //loadChildren: './theme/auth/auth.module#AuthModule',
		loadChildren: () => import('./theme/auth/auth.module').then(m => m.AuthModule)
      },
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
       // loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
		loadChildren: () => import('./theme/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user',
        //loadChildren: './theme/users/users.module#UsersModule'
		loadChildren: () => import('./theme/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'settings',
        //loadChildren: './theme/settings/settings.module#SettingsModule'
		loadChildren: () => import('./theme/settings/settings.module').then(m => m.SettingsModule)
      },
      // {
      //   path: '',
      //   canActivate: [SuperAdminGuard],
      //   children: [
      //     {
      //       path: 'user',
      //       loadChildren: './theme/users/users.module#UsersModule'
      //     },
      //     {
      //       path: 'settings',
      //       loadChildren: './theme/settings/settings.module#SettingsModule'
      //     },
      //   ]
      // },
      // {
      //   path: 'website',
      //   canActivate: [ContentManagerGuard],
      //   loadChildren: './theme/website-settings/website-settings.module#WebsiteSettingsModule'
      // },
      {
        path: 'website',
       // loadChildren: './theme/website-settings/website-settings.module#WebsiteSettingsModule'
		loadChildren: () => import('./theme/website-settings/website-settings.module').then(m => m.WebsiteSettingsModule)
      },
      {
          path: 'focus-areas',
         // loadChildren: './theme/focus-areas/focus-areas.module#FocusAreasModule'
		  loadChildren: () => import('./theme/focus-areas/focus-areas.module').then(m => m.FocusAreasModule)
      },
      {
          path: 'learning-areas',
        //  loadChildren: './theme/learning-areas/learning-areas.module#LearningAreasModule'
		  loadChildren: () => import('./theme/learning-areas/learning-areas.module').then(m => m.LearningAreasModule)
      },
      {
          path: 'units',
          //loadChildren: './theme/units/units.module#UnitsModule'
		  loadChildren: () => import('./theme/units/units.module').then(m => m.UnitsModule)
      },
      {
          path: 'lesson-outcome',
         // loadChildren: './theme/outcome/outcome.module#OutcomeModule'
		  loadChildren: () => import('./theme/outcome/outcome.module').then(m => m.OutcomeModule)
      },
      {
          path: 'lessons',
        //  loadChildren: './theme/lessons/lessons.module#LessonsModule'
		  loadChildren: () => import('./theme/lessons/lessons.module').then(m => m.LessonsModule)
      },
      {
          path: 'file-manager',
          //loadChildren: './theme/file-manager/file-manager.module#FileManagerModule'
		  loadChildren: () => import('./theme/file-manager/file-manager.module').then(m => m.FileManagerModule)
      },
      {
          path: 'classroom-resources',
        //  loadChildren: './theme/classroom-resources/classroom-resources.module#ClassroomResourcesModule'
		  loadChildren: () => import('./theme/classroom-resources/classroom-resources.module').then(m => m.ClassroomResourcesModule)
      },
      {
          path: 'teacher-resources',
         // loadChildren: './theme/teacher-resources/teacher-resources.module#TeacherResourcesModule'
		  loadChildren: () => import('./theme/teacher-resources/teacher-resources.module').then(m => m.TeacherResourcesModule)
      },
      {
          path: 'instructor',
         // loadChildren: './theme/instructor/instructor.module#InstructorModule'
		  loadChildren: () => import('./theme/instructor/instructor.module').then(m => m.InstructorModule)
      },
      {
          path: 'school',
         // loadChildren: './theme/school/school.module#SchoolModule'
		  loadChildren: () => import('./theme/school/school.module').then(m => m.SchoolModule)
      },
      {
        path: 'weather-report',
       // loadChildren: './theme/weather-report/weather-report.module#WeatherReportModule'
		loadChildren: () => import('./theme/weather-report/weather-report.module').then(m => m.WeatherReportModule)
      },
      {
          path: 'curriculum-map',
         // loadChildren: './theme/curriculum/curriculum.module#CurriculumModule'
		  loadChildren: () => import('./theme/curriculum/curriculum.module').then(m => m.CurriculumModule)
      },
      {
          path: 'help',
          //loadChildren: './theme/help/help.module#HelpModule'
		  loadChildren: () => import('./theme/help/help.module').then(m => m.HelpModule)
      },
      {
        path: 'demo-request',
        //loadChildren: './theme/quote/quote.module#QuoteModule'
		loadChildren: () => import('./theme/quote/quote.module').then(m => m.QuoteModule)
      },
      {
        path: 'agent',
        canActivate: [SuperAdminGuard],
        //loadChildren: './theme/agent/agent.module#AgentModule'
		loadChildren: () => import('./theme/agent/agent.module').then(m => m.AgentModule)
      },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
