import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

    constructor(private API: ApiService) { }

    changePassword(current_password, new_password, confirm_password) {
        return this.API.post('user/change_password', {
            'current_password': current_password,
            'new_password': new_password,
            'confirm_password': confirm_password,
        });
    }
}
