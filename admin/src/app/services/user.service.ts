import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class UserService {
    isProfileCompleted: boolean;
    askSecurityQuestions: boolean;
    isAdmin: boolean;
    userLang = new EventEmitter<any>();
    userCurrentLang = null;
    userFullName = null;

    userType: string;
    emitUserType = new EventEmitter<string>();

    fullName: string;
    emitFullName = new EventEmitter<string>();

    avatar: string;
    emitAvatar = new EventEmitter<string>();

    unreadMessagesCount = 0;
    unreadMessages = [];
    unreadMessagesCountEmit = new EventEmitter<number>();
    unreadMessagesEmit = new EventEmitter<any>();

    notifications = [];
    emitNotifications = new EventEmitter<any>();

    courseImage = '';
    emitCourseImage = new EventEmitter<string>();

    menuItems = [];
    accessRoles = [];

    constructor(private API: ApiService) {
      this.unreadMessagesCount = this.API.totalUnreadMessageCount;
      this.API.totalUnreadMessageCountEmit.subscribe((unreadMessagesCount) => {
        this.unreadMessagesCount = unreadMessagesCount;
        this.unreadMessagesCountEmit.emit(this.unreadMessagesCount);
      });
      this.unreadMessages = this.API.unreadMessage;
      this.API.unreadMessageEmit.subscribe((unreadMessages) => {
        this.unreadMessages = unreadMessages;
        this.unreadMessagesEmit.emit(this.unreadMessages);
      });
      this.notifications = this.API.notification;
      this.API.emitNotification.subscribe((notification) => {
        this.notifications = notification;
        this.emitNotifications.emit(this.notifications);
      });
    }

    getUnreadMessages() {
      return {
        'unread_messages_count': this.unreadMessagesCount,
        'unread_messages': this.unreadMessages,
      };
    }

    checkOtpStatus() {
        return this.API.post('user/two_factor_auth');
    }

    accountSettings() {
        return this.API.post('user/account_settings');
    }

    setupGoogleAuth() {
        return this.API.post('user/setup_otp');
    }

    enableGoogleAuth(key: string, code: string, security_answers: {}) {
        const data = {
            'key': key,
            'code': code,
            'security_answers': security_answers
        };
        return this.API.post('user/enable_otp', data);
    }

    disableGoogleAuth(code: string, security_answers: {}) {
        const data = {
            'code': code,
            'security_answers': security_answers
        };
        return this.API.post('user/disable_otp', data);
    }

    showProfileData() {
        return this.API.post('user/profile');
    }

    sendUserProfileFormData(first_name: string,
                            last_name: string,
                            phone: string,
                            address: string,
                            city: string,
                            state: string,
                            country_code: string,
                            postal_code: string) {

        const data = {
            'first_name': first_name,
            'last_name': last_name,
            'phone': phone,
            'address': address,
            'city': city,
            'state': state,
            'country_code': country_code,
            'postal_code': postal_code
        };
        return this.API.post('user/update_profile', data);
    }

    sendChangePasswordFormData(current_password: string, new_password: string, confirm_password: string) {
        const data = {
            'current_password': current_password,
            'new_password': new_password,
            'confirm_password': confirm_password
        };
        return this.API.post('user/change_password', data);
    }

    getLanguages(code) {
        return this.API.get('general/languages?current_language=' + code);
    }

    changeLanguage(lang_id) {
        return this.API.post('user/change_language', {'lang_id': lang_id});
    }

    GetUsersList(keyword = '', page, per_page, order, order_by) {
        const data = {
            'keyword': keyword,
            'page_no': page,
            'page_size': per_page,
            'order': order,
            'order_by': order_by
        };
        return this.API.post('admin/user/index', data);
    }

    ActiveStatus(id, status) {
        const data = {
            'user_id': id,
            'data': status,
            'type': 'active',
        };
        return this.API.post('admin/user/quick_update', data);
    }

    VerifiyStatus(id, status) {
        const data = {
            'user_id': id,
            'data': status,
            'type': 'email_verified',
        };
        return this.API.post('admin/user/quick_update', data);
    }

    WithdrawStatus(id, status) {
        const data = {
            'user_id': id,
            'data': status,
            'type': 'can_withdraw',
        };
        return this.API.post('admin/user/quick_update', data);
    }

    getUserById(id) {
        const data = {
            'id': id,
        };
        return this.API.post('admin/user/edit', data);
    }

    SaveCredential(user_id, active, email_verified, can_withdraw, email, password) {
        const data = {
            'user_id': user_id,
            'active': active,
            'email_verified': email_verified,
            'can_withdraw': can_withdraw,
            'email': email,
            'password': password,
        };
        return this.API.post('admin/user/credential', data);
    }

    SaveProfile(id, first_name, last_name, phone, address, city, state, country_code, postal_code) {
        const data = {
            'user_id': id,
            'first_name': first_name,
            'last_name': last_name,
            'phone': phone,
            'address': address,
            'city': city,
            'state': state,
            'country_code': country_code,
            'postal_code': postal_code,
        };
        return this.API.post('admin/user/save', data);
    }

    checkQuestion() {
      return this.API.post('questions/show');
    }

    askSecurityQuestion() {
        return this.API.post('questions/ask');
    }

    saveSecurityQuestion(formData: any) {
        const data = {
            'answers': JSON.stringify(formData)
        };
        return this.API.post('questions/save', data);
    }

  changePassword(current_password, new_password) {
    return this.API.post('change/password', {
      'current_password': current_password,
      'new_password': new_password,
    });
  }

  createMenuItems(menuItems) {
      const main = [];
      main.push({
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'fa fa-home'
      });
      for (let i = 0; i < menuItems.length; i++) {
        main.push(menuItems[i]);
      }
      this.menuItems = [
        {
          label: '',
          main: main
        }
      ];
  }
}
