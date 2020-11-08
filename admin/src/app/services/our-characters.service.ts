import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OurCharactersService {

  constructor(private API: ApiService) { }

  getCharacterFormData(id) {
    return this.API.post('ourcharacters/get_data', {
      'id': id
    });
  }

  submitCharacterForm(data) {
    return this.API.post('ourcharacters/save', data);
  }

  submitCharacterOrderForm(data) {
    return this.API.post('ourcharacters/save_order', data);
  }

  CharacterListing() {
    return this.API.post('ourcharacters/listing');
  }

  deleteCharacter(id) {
    return this.API.post('ourcharacters/delete', {
      'id': id
    });
  }
}
