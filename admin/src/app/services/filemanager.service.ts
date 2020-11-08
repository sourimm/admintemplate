import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class FilemanagerService {

    constructor(private API: ApiService) { }

    getFolderFormData(id) {
        return this.API.post('filemanager/get_folder_data', {
            'id': id
        });
    }

    submitFolderForm(data) {
        return this.API.post('filemanager/save_folder', data);
    }

    saveFiles(data) {
        return this.API.post('filemanager/save_files', data);
    }

    getCourses() {
        return this.API.post('filemanager/get_courses');
    }

    FolderListing(parent_id) {
        const data = {
            'parent_id': parent_id
        };
        return this.API.post('filemanager/folder_listing', data);
    }

    deleteFolder(id, type) {
        return this.API.post('filemanager/delete_folder', {
            'id': id,
            'type': type
        });
    }
}
