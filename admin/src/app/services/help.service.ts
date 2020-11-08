import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private API: ApiService) { }

  // Category CRUD

  HelpCategoryListing() {
    return this.API.post('help/categories_list');
  }

  getHelpCategoryFormData(id) {
    return this.API.post('help/get_category_data', {
      'id': id
    });
  }

  submitHelpCategoryForm(data) {
    return this.API.post('help/save_category', data);
  }

  changeStatusHelpCategory(id) {
    return this.API.post('help/category_change_status', {
      'id': id
    });
  }

  deleteCategory(id) {
    return this.API.post('help/delete_category', {
      'id': id
    });
  }

  // Article CRUD

  HelpArticleListing(page_no, page_size, order, order_by, keyword, category_id) {
    const data = {
      'page_no': page_no,
      'page_size': page_size,
      'order': order,
      'order_by': order_by,
      'keyword': keyword,
      'category_id': category_id,
    };
    return this.API.post('help/articles_listing', data);
  }

  getHelpArticleFormData(id) {
    return this.API.post('help/get_article_data', {
      'id': id
    });
  }

  submitHelpArticleForm(data) {
    return this.API.post('help/save_article', data);
  }

  changeStatusHelpArticle(id) {
    return this.API.post('help/article_change_status', {
      'id': id
    });
  }

  changeStatusHelpTopArticle(id) {
    return this.API.post('help/is_top_article_change_status', {
      'id': id
    });
  }

  deleteArticle(id) {
    return this.API.post('help/delete_article', {
      'id': id
    });
  }
}
