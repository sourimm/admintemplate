import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ListHelpComponent } from './list-help/list-help.component';
import { CreateHelpComponent } from './create-help/create-help.component';
import {SharedModule} from '../../shared/shared.module';
import {UiSwitchModule} from 'ngx-ui-switch'; //'ng2-ui-switch/dist';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {QuillEditorModule} from 'ngx-quill-editor';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    SharedModule,
    UiSwitchModule,
    CKEditorModule,
   /* QuillEditorModule,*/
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ListCategoriesComponent, ListHelpComponent, CreateHelpComponent]
})
export class HelpModule { }
