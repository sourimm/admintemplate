import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {NotifyService} from './notify.service';

@Injectable()
export class ApiService {

  baseURL = null;
  requestHeaders = {};
  authToken = null;
  // currentLanguage = 'en';
  processing = new EventEmitter<boolean>();
  private inProcessCount = 0;
  languageCodesArray = ['en', 'de'];

  totalUnreadMessageCount = 0;
  totalUnreadMessageCountEmit = new EventEmitter<number>();
  unreadMessage = [];
  unreadMessageEmit = new EventEmitter<any>();

  notification = [];
  emitNotification = new EventEmitter<any>();

  constructor(private httpClient: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private notifyService: NotifyService) {
    this.baseURL = environment.apiEndpoint;
    this.requestHeaders = environment.apiRequestHeaders;
  }

  get(url, auth = false): Promise<any> {
    setTimeout(() => {
      this.beforeRequest();
    });

    if (url.indexOf('?') > 0) {
      url += '&';
    } else {
      url += '?';
    }
    url += 'auth_token=' + this.authToken;

    // api call
    let url_link = this.baseURL + 'admin/' + url;
    if (auth === true) {
      url_link = this.baseURL + url;
    }

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders(this.requestHeaders);
      this.httpClient
        .get(url_link, {headers: headers, observe: 'response'})
        // .get(this.baseURL + url)
        .subscribe((resp: any) => {
          this.afterRequest();
          resolve(resp.body);
        }, (error: any) => {
          this.afterRequest();
          this.handleError(error);
          reject(error);
       });
    });
  }

  post(url, data = null, auth = false, form =  new HttpParams()) {
    setTimeout(() => {
      this.beforeRequest();
    });

    // Check language code
    const lang_code = this.route.snapshot.queryParams['hl'];
    let current_language: string;
    if (typeof lang_code !== 'undefined') {
      current_language = lang_code;
    } else {
      const local_current_lang = localStorage.getItem('current_language');
      if (local_current_lang || local_current_lang !== null) {
        current_language = local_current_lang;
      } else {
        current_language = 'en';
      }
    }

    const languageCodes = this.languageCodesArray;
    if (languageCodes.indexOf(current_language) < 0) {
      current_language = 'en';
    }
    // End of check language

    // form.append('token', this.authToken);
    // form.append('current_language', current_language);

    // let body = new HttpParams();

    form = form.append('auth_token', this.authToken);
    // form = form.append('current_language', current_language);

    if (typeof data !== null) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          form = form.append(key, data[key]);
        }
      }
    }
    // api call
    let url_link = this.baseURL + 'admin/' + url;
    if (auth === true) {
      url_link = this.baseURL + url;
    }
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders(this.requestHeaders);
      this.httpClient
        .post(url_link, (form.toString()).replace(/\+/gi, '%2B'), {headers: headers, observe: 'response'})
        .subscribe((resp: any) => {
          this.afterRequest();
          this.totalUnreadMessageCount = resp.body.total_unread_messages;
          this.totalUnreadMessageCountEmit.emit(resp.body.total_unread_messages);
          this.unreadMessage = resp.body.unread_messages;
          this.unreadMessageEmit.emit(resp.body.unread_messages);
          this.notification = resp.body.notifications_list;
          this.emitNotification.emit(resp.body.notifications_list);
          resolve(resp.body);
        }, (error: any) => {
          this.afterRequest();
          this.handleError(error);
          reject(error);
        });
    });
  }

  handleError(resp: any, auth = false) {
    if (!navigator.onLine) {
      this.notifyService.error('No internet connection. You are seems to be offline');
    } else if (resp.status === 503) {
      this.router.navigate(['/maintenance']);
    } else if (resp.status === 401) {
      if (auth === false) {
        if (resp.error.message) {
          this.notifyService.error(resp.error.message);
        }
        localStorage.removeItem('xQ0iR59q80');
        this.router.navigate(['/login']);
      } else {
        return resp;
      }
    } else if (resp.status === 400) {
      // this.blockedMessage = resp.error.message;
      // this.router.navigate(['/blocked']);
      window.location.href = resp.error.data.redirect_url;
    } else if (resp.status === 404) {
      this.notifyService.error(resp.error.message);
      this.router.navigate(['/not/found']);
    } else if (resp.status === 422) {
      const error = resp.error.errors;
      const errorObject = {};
      for (let i = 0; i < error.length; i++) {
        errorObject[error[i].param] = error[i].msg;
      }
      resp['errorObject'] = errorObject;
      return resp;
    } else {
      if (resp.hasOwnProperty('error') && resp.error.hasOwnProperty('message')) {
        this.notifyService.error(resp.error.message);
      } else if (resp.hasOwnProperty('message')) {
        this.notifyService.error(resp.message);
      } else {
        this.notifyService.error('Oops! An Unknown error occurred. Reload your page');
      }
    }
  }

  parseLabel(key, labels, defaultVal = '') {
    if (labels.hasOwnProperty(key)) {
      return labels[key];
    }
    if (defaultVal !== '') {
      return '!' + defaultVal;
    }
  }

  private beforeRequest() {
    this.inProcessCount++;
    this.processing.emit(true);
  }

  private afterRequest() {
    this.inProcessCount--;
    if (this.inProcessCount === 0) {
      this.processing.emit(false);
    }
  }

  saveAuthToken(token: string) {
    this.authToken = token;
  }
}
