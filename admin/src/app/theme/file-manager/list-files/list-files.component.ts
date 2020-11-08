import {Component, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {FormControl, FormGroup} from "@angular/forms";
import {FilemanagerService} from "../../../services/filemanager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyService} from "../../../services/notify.service";
import {ApiResponse} from "../../../models/ApiResponse";

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {

    loading = true;

    id = 0;

    folders = [];
    folder_files = [];

    message = '';

    @ViewChild('modalLarge') private modalLarge;
    addModalLarge = false;
    folderDataLoading = true;
    folderData: any;

    folderForm: FormGroup;
    formProcessing = false;
    uploadFileProcessing = false;

    validationErrors: any;

    files: File[] = [];

    myfiles = [];

    folder_path = [];

    constructor(private filemanagerService: FilemanagerService,
                private route: ActivatedRoute,
                private router: Router,
                private notifyService: NotifyService) { }

    ngOnInit() {
        this.route.params.subscribe( (params) => {
            this.id = params['id'];
            this.getFolderListing();
        });
    }

    private getFolderListing() {
        this.folders = [];

        this.loading = true;

        this.filemanagerService.FolderListing(
            this.id,
        )
            .then(
                (res: ApiResponse) => {
                    if (res.status === true) {
                        this.loading = true;
                        this.folders = res.data.result;
                        this.folder_files = res.data.files;
                        this.folder_path = res.data.path;
                        this.message = res.message;
                        this.loading = false;
                    } else {
                        this.notifyService.error(res.message);
                    }
                }
            )
            .catch((error: any) => {
            });
    }

    getFolderFormData() {
        this.addModalLarge = true;
        setTimeout(() => {
            this.modalLarge.show();
        }, 100);

        this.filemanagerService.getFolderFormData(0)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.folderData = res.data.folder;
                    this.folderDataLoading = false;
                    this.initForm();
                } else {
                    this.router.navigate(['file-manager', this.id]);
                    this.notifyService.error(res.message);
                }
            })
            .catch((error: any) => {
            });
    }

    private initForm() {
        const data = this.folderData;

        if (data.parent_id === '') {
            data.parent_id = this.id;
        }

        this.folderForm = new FormGroup({
            'id': new FormControl(data.id),
            'parent_id': new FormControl(data.parent_id),
            'name': new FormControl(data.name),
        });
    }

    submit() {
        // this.formProcessing = true;
        this.validationErrors = {};

        const formData = this.folderForm.getRawValue();

        const data = {
            'id': formData.id,
            'parent_id': formData.parent_id,
            'name': formData.name,
        };

        this.filemanagerService.submitFolderForm(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.initForm();
                    setTimeout(() => {
                        this.modalLarge.hide();
                    }, 100);
                    this.addModalLarge = false;
                    this.getFolderListing();
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

    saveFiles() {
      this.uploadFileProcessing = true;
        const data = {
            'files': JSON.stringify(this.myfiles),
            'folder_id': this.id,
        };

        this.filemanagerService.saveFiles(data)
            .then((res: ApiResponse) => {
                if (res.status === true) {
                    this.notifyService.success(res.message);
                    this.getFolderListing();
                    this.files = [];
                    this.myfiles = [];
                } else {
                    this.formProcessing = false;
                    this.getFolderListing();
                    this.notifyService.error(res.message);
                }
              this.uploadFileProcessing = false;
            })
            .catch((error: any) => {
                this.formProcessing = false;
                this.uploadFileProcessing = false;
                if (error.status === 422) {
                    this.validationErrors = error.error.errors;
                } else {}
            });
    }

    onSelect(event) {

        this.files.push(...event.addedFiles);

        this.myfiles = [];
        for (const car_image of this.files) {
            this.readFile(car_image).then(information => {
                console.log(information);
                this.myfiles.push(information);
            });
        }
        console.log(this.myfiles);

    }

    onRemove(event) {

        this.files.splice(this.files.indexOf(event), 1);

        this.myfiles = [];
        for (const car_image of this.files) {
            this.readFile(car_image).then(information => {
                this.myfiles.push(information);
            });
        }
    }

    private async readFile(file: File): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = e => {
                return resolve(
                    {
                        'base_64' : (e.target as FileReader).result,
                        'name': file.name,
                        'ext': file.name.split('.').pop().toLowerCase(),
                    }
                );
            };

            reader.onerror = e => {
                console.error(`FileReader failed on file ${file.name}.`);
                return reject(null);
            };

            if (!file) {
                console.error('No file to read.');
                return reject(null);
            }

            reader.readAsDataURL(file);
        });
    }

    copyMessage(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.notifyService.success('File link copied to clipboard!');
    }


    deleteFile(id, type) {
        swal({
            title: 'Are you sure?',
            text: 'You wont be able to revert',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.filemanagerService.deleteFolder(id, type)
                    .then((res: ApiResponse) => {
                        if (res.status === true) {
                            // swal(
                            //     'Deleted!',
                            //     res.message,
                            //     'success'
                            // );
                            this.getFolderListing();
                            this.notifyService.success(res.message);
                        } else {
                            this.notifyService.error(res.message);
                            swal(
                                'Error!',
                                res.message,
                                'error'
                            );
                        }
                    })
                    .catch((error: any) => {});
            }
        });
    }

}
