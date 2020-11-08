import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { ListFilesComponent } from './list-files/list-files.component';
import {SharedModule} from "../../shared/shared.module";
import {NgxDropzoneModule} from "ngx-dropzone";

@NgModule({
  imports: [
    CommonModule,
    FileManagerRoutingModule,
      SharedModule,
      NgxDropzoneModule
  ],
  declarations: [ListFilesComponent]
})
export class FileManagerModule { }
