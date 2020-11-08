import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private API: ApiService) { }

  getAgentFormData(id) {
    return this.API.post('agents/get_agent_data', {
      'id': id
    });
  }

  submitAgentForm(data) {
    return this.API.post('agents/save_agent', data);
  }

  AgentListing(page_no, page_size, order, order_by, keyword) {
    const data = {
      'page_no': page_no,
      'page_size': page_size,
      'order': order,
      'order_by': order_by,
      'keyword': keyword,
    };
    return this.API.post('agents/agent_listing', data);
  }

  deleteAgent(id) {
    return this.API.post('agents/delete_agent', {
      'id': id
    });
  }
}
