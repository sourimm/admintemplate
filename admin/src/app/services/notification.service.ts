import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable()
export class NotificationService {

  constructor(private API: ApiService) { }

    markNotificationsAsRead(id) {
      return this.API.post('notification/mark_notification_as_read', {
          'id': id,
      });
    }
}
