import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class AuthService {
  private localStorageAuthTokeKey = 'd6fe52872e0d';

  constructor(private API: ApiService) {}

  saveLocalStorageAuthToken(tokenObject: {}) {
    localStorage.setItem(this.localStorageAuthTokeKey, JSON.stringify(tokenObject));
  }

  getLocalStorageAuthToken() {
    const tokenObject = localStorage.getItem(this.localStorageAuthTokeKey);
    if (tokenObject === null) {
      return null;
    } else {
      return JSON.parse(tokenObject);
    }
  }

  removeLocalStorageAuthToken() {
    localStorage.removeItem(this.localStorageAuthTokeKey);
  }

  sendLoginFormData(username: string, password: string, captcha: string) {
    const data = {
      'username' : username,
      'password' : password,
      'captcha': captcha,
      'device_type' : 'web',
      'device_token' : 'web',
      'user_type' : 'admin',
      'user_agent' : navigator.userAgent,
      'platform' : navigator.platform,
    };
    return this.API.post('auth/login', data, true);
  }

  registerTeacher(data) {
    return this.API.post('auth/register', data, true);
  }

  sendRegisterFormData(full_name: string, email: string, password: string, sponsor: string, invitation: string) {
    const data = {
      'full_name' : full_name,
      'email' : email,
      'password' : password,
      'sponsor' : sponsor,
      'device_type' : 'web',
      'invitation' : invitation
    };
    return this.API.post('auth/register', data);
  }

    sendForgotPasswordFormData(username: string) {
        return this.API.post('auth/forgot_password', {'username' : username, 'user_type': 'admin'}, true);
    }

    sendForgotUsernameFormData(email: string) {
        return this.API.post('auth/forgot_username', {'email' : email, 'user_type': 'admin'}, true);
    }

    sendResetPasswordFormData(token: string, username: string, password: string, conf_password: string) {
        const data = {
            'token' : token,
            'username' : username,
            'password' : password,
            'conf_password' : conf_password,
            'user_type': 'admin'
        };
        return this.API.post('auth/reset_password', data, true);
    }

  sentOtpFormData(otp: string) {
    return this.API.post('auth/verify_otp', {'otp' : otp});
  }

  isLoggedIn() {
    const tokenObj: {auth_token: string, otp?: boolean} = this.getLocalStorageAuthToken();

    if (!tokenObj || !tokenObj.otp || tokenObj === null) {
      return false;
    }
    this.API.saveAuthToken(tokenObj.auth_token);
    return true;
  }

  logout() {
    return this.API.post('auth/logout', {'all_devices': 0}, true);
  }

  verifyEmail(token: string) {
    return this.API.post('auth/verify_email', {'token' : token});
  }
}
