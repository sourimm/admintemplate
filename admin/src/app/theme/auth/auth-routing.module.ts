import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {ForgetUsernameComponent} from "./forget-username/forget-username.component";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    }
  },
    {
        path: 'forgot-username',
        component: ForgetUsernameComponent,
        data: {
            title: 'Forgot Username'
        }
    },
    {
        path: 'forgot-password',
        component: ForgetPasswordComponent,
        data: {
            title: 'Forgot Password'
        }
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
        data: {
            title: 'Reset Password'
        }
    },
  { path: 'verify/email/:token', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
