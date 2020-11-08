import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from './users-list/users-list.component';
import {AddUserComponent} from './add-user/add-user.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: {
      title: 'Users List'
    }
  },
  {
    path: 'add',
    component: AddUserComponent,
    data: {
      title: 'Add User'
    }
  },
  {
    path: 'edit/:id',
    component: AddUserComponent,
    data: {
      title: 'Edit User'
    }
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    data: {
      title: 'Edit Profile'
    }
  },
  {
    path: 'change/password',
    component: ChangePasswordComponent,
    data: {
      title: 'Change Password'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
