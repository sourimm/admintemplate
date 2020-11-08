import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChangePasswordComponent} from './change-password/change-password.component';

const routes: Routes = [
    {
        path: 'change/password',
        component: ChangePasswordComponent,
        data: {
            title: 'Change Password'
        }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
