import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherReportService {

  constructor(private API: ApiService) { }

  getList() {
    return this.API.post('weatherreport/listing');
  }

  saveData(data) {
    return this.API.post('weatherreport/save_data', data);
  }

  uploadCharacterImage(data) {
    return this.API.post('weatherreport/upload_character', data);
  }

  deleteData(id) {
    return this.API.post('weatherreport/delete', {
      'id': id,
    });
  }
}
