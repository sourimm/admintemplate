import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {SharedModule} from '../../shared/shared.module';
import { LogoutComponent } from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {SelectOptionService} from '../../shared/elements/select-option.service';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetUsernameComponent } from './forget-username/forget-username.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [LoginComponent, LogoutComponent, RegisterComponent, VerifyEmailComponent, ForgetPasswordComponent, ForgetUsernameComponent, ResetPasswordComponent],
  providers: [SelectOptionService]
})
export class AuthModule { }
