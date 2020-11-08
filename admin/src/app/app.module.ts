import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';

import {MenuItems} from './shared/menu-items/menu-items';

import {ApiService} from './services/api.service';
import {GeneralService} from './services/general.service';
import {AuthGuard} from './services/auth-guard.service';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {NotifyService} from './services/notify.service';

import {AppComponent} from './app.component';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';

import {RecaptchaModule} from 'ng-recaptcha';
//import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {NotificationService} from './services/notification.service';
import {ContentManagerGuard} from './services/content-manager-guard.service';
import {SuperAdminGuard} from './services/super-admin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
	RecaptchaModule,
    /* RecaptchaModule.forRoot(),
   RecaptchaFormsModule*/
  ],
  schemas: [],
  providers: [
    MenuItems,
    ApiService,
    GeneralService,
    AuthGuard,
    SuperAdminGuard,
    ContentManagerGuard,
    UserService,
    AuthService,
    NotifyService,
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
