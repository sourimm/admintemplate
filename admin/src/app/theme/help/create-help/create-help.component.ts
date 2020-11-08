import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {NotifyService} from '../../../services/notify.service';
import {HelpService} from '../../../services/help.service';

import {SlugifyPipe} from '../../../pipes/slugify.pipe';

import {ApiResponse} from '../../../models/ApiResponse';

// import * as ClassicEditor from '../../../../../ckeditor5-build-classic';

@Component({
  selector: 'app-create-help',
  templateUrl: './create-help.component.html',
  styleUrls: ['./create-help.component.scss']
})
export class CreateHelpComponent implements OnInit {
  articleForm: FormGroup;

  id = 0;

  form_loading = true;
  formProcessing = false;

  pageTitle = 'Add Article';
  articleData: any;
  validationErrors: any;

  categories = [];
  slug = '';

  @ViewChild('modalLarge') private modalLarge;
  addModalLarge = false;
  categoryTitle = '';
  categorySlug = '';
  selectedCategory = '0';
  formProcessingCategory = false;
  validationErrorsCategory: any;

  // public editor = ClassicEditor;
  // description = '';

  public editor;
  public editorContent;
  public editorConfig = {
    placeholder: 'Add Article Description',
  };

  constructor(private slugifyPipe: SlugifyPipe,
              private helpService: HelpService,
              private route: ActivatedRoute,
              private router: Router,
              private notifyService: NotifyService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (typeof id !== 'undefined') {
      this.id = id;
    }

    if (this.id > 0) {
      this.pageTitle = 'Edit Article';
    }

    this.getFormData(this.id);

    setTimeout(() => {
      this.editorContent = this.editorContent;
      // console.log('you can use the quill instance object to do something', this.editor);
      // this.editor.disable();
    }, 2800);
  }

  onEditorBlured(quill) {
    // console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    // console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    // console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    // console.log('quill content is changed!', quill, html, text);
  }

  private getFormData(id) {
    this.helpService.getHelpArticleFormData(id)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.articleData = res.data.article;
          this.categories = res.data.categories;
          this.initForm();
          this.form_loading = false;
        } else {
          this.router.navigate(['help/add']);
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {});
  }

  private initForm() {
    const data = this.articleData;
    this.slug = data.slug;
    this.editorContent = data.description;

    this.articleForm = new FormGroup({
      'id': new FormControl(data.id),
      'title': new FormControl(data.title),
      'description': new FormControl(data.description),
      'is_top_article': new FormControl(data.is_top_article),
      'active': new FormControl(data.active),
      'category_id': new FormControl(data.category_id),
    });
  }

  slugify() {
    const formData = this.articleForm.getRawValue();
    this.slug = this.slugifyPipe.transform(formData.title);
  }

  submit() {
    const formData = this.articleForm.getRawValue();
    if (formData.title.trim() === '') {
      this.notifyService.error('Title is required');
      return false;
    }

    this.formProcessing = true;
    this.validationErrors = {};

    let active = '0';
    if (formData.active === true) {
      active = '1';
    }

    let is_top_article = '0';
    if (formData.is_top_article === true) {
      is_top_article = '1';
    }

    let category_id = '';
    if (formData.category_id > 0) {
      category_id = formData.category_id;
    }

    const data = {
      'id': formData.id,
      'title': formData.title,
      'slug': this.slug,
      'description': this.editorContent,
      // 'description': this.description,
      'is_top_article': is_top_article,
      'active': active,
      'category_id': category_id,
    };

    this.helpService.submitHelpArticleForm(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.router.navigate(['help/article/list']);
        } else {
          this.formProcessing = false;
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {
        this.formProcessing = false;
        if (error.status === 422) {
          this.validationErrors = error.error.errors;
        } else {}
      });
  }

  // Add article category

  addCategory() {
    this.categoryTitle = '';
    this.categorySlug = '';
    this.addModalLarge = true;

    setTimeout(() => {
      this.modalLarge.show();
    }, 100);
  }

  slugifyCategory(input: string) {
    this.categorySlug = this.slugifyPipe.transform(input);
  }

  submitCategory() {
    if (this.categoryTitle.trim() === '') {
      this.notifyService.error('Title is required');
      return false;
    }

    const data = {
      'id': 0,
      'title': this.categoryTitle,
      'slug': this.categorySlug,
      'active': '1',
    };
    this.validationErrorsCategory = {};
    this.formProcessingCategory = true;

    this.helpService.submitHelpCategoryForm(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.selectedCategory = res.data.selected_category;
          this.categories = res.data.categories;
          this.categoryTitle = '';
          this.categorySlug = '';
          this.articleForm.controls['category_id'].setValue(this.selectedCategory.toString());

          setTimeout(() => {
            this.modalLarge.hide();
          }, 100);
          this.addModalLarge = false;
          this.formProcessingCategory = false;
        } else {
          this.formProcessingCategory = false;
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {
        this.formProcessingCategory = false;
        if (error.status === 422) {
          this.validationErrorsCategory = error.error.errors;
        } else {}
      });
  }
}
