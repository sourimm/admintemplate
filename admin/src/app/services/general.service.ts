import {EventEmitter, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ApiResponse} from '../models/ApiResponse';

@Injectable()
export class GeneralService {
  changeLanguage = new EventEmitter<string>();
  pageTitle = new EventEmitter<string>();
  pageDescription = new EventEmitter<string>();
  showSideBar = new EventEmitter<boolean>();
  toggleSideBar = new EventEmitter<boolean>();
  showHeaderIcons = new EventEmitter<boolean>();
  generalLabels = new EventEmitter<{}>();
  labels = {};
  sidebarMenuLabels = {};
  authNav = new EventEmitter<boolean>();
  countUnread = new EventEmitter<string>();

  constructor(private API: ApiService) {}

  setCurrentLanguage(code) {
    const languageCodes = this.API.languageCodesArray;
    if (languageCodes.indexOf(code) < 0) {
      code = 'en';
    }
    this.changeLanguage.emit(code);
  }

  getCountryListFromAPI() {
    return this.API.get('general/countries');
  }

  getLabelsFromAPI(lang_code: string) {
    return this.API.get('general/labels?current_language=' + lang_code);
  }

  onSort($event, current_order) {
    const elem = $event.target;
    let order;
    if (current_order === 'asc') {
      order = 'desc';
    } else {
      order = 'asc';
    }

    const orderColumn = elem.getAttribute('data-column');
    elem.setAttribute('class', 'sorting sorting_' + order);

    // get siblings and remove ordering class
    const siblings = this.getSiblings(elem);
    for ( const i in siblings) {
      if (siblings.hasOwnProperty(i)) {
        const el = siblings[i];
        if (el.classList.contains('sorting')) {
          // el.setAttribute('class', 'sorting');
          el.classList.remove('sorting_' + current_order);
        }
      }
    }

    return {
      order: order,
      orderColumn: orderColumn
    };
  }
  private getSiblings(n) {
    return this.getChildren(n.parentNode.firstChild, n);
  }
  private getChildren(n, skipMe) {
    const r = [];
    for ( ; n; n = n.nextSibling ) {
      if ( n.nodeType === 1 && n !== skipMe) {
        r.push( n );
      }
    }
    return r;
  }

  getLanguages() {
    return this.API.get('general/languages');
  }

  getFaqsForContactUs() {
    return this.API.post('general/get_faqs');
  }
  contactUsForm(full_name, email, subject, message) {
    const data = {
      name: full_name,
      email: email,
      subject: subject,
      message: message,
    };

    return this.API.post('general/save_contact_us_form', data);
  }

  loadGeneralLabels(code) {
    this.getGeneralLabels(code)
      .then((resp: ApiResponse) => {
        this.labels = resp.labels;
        this.generalLabels.emit(resp.labels);
      })
      .catch((error: any) => {
      });
  }
  private getGeneralLabels(lang_code: string) {
    return this.API.get('general/labels?current_language=' + lang_code);
  }

  validate() {
    return this.API.post('user/validate');
  }

  getProfileFormData() {
    return this.API.post('general/get_profile');
  }

  submitEditProfileForm(data) {
    return this.API.post('general/save_profile', data);
  }

  getCompanyDropdown() {
    return this.API.post('company/dropdown');
  }

  getLocationDropdown(company_id) {
    return this.API.post('location/dropdown', {
      'company_id': company_id
    });
  }
}
