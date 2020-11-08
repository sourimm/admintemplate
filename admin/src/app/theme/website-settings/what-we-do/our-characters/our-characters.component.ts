import { Component, OnInit } from '@angular/core';
import {ApiResponse} from '../../../../models/ApiResponse';
import swal from 'sweetalert2';
import {FormControl, FormGroup} from '@angular/forms';
import {OurCharactersService} from '../../../../services/our-characters.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifyService} from '../../../../services/notify.service';

@Component({
  selector: 'app-our-characters',
  templateUrl: './our-characters.component.html',
  styleUrls: ['./our-characters.component.scss']
})
export class OurCharactersComponent implements OnInit {
  characterForm: FormGroup;

  id = 0;
  parent_id = 0;

  flags = false;

  form_loading = true;
  formProcessing = false;

  pageTitle = 'Add Character';
  characterData: any;

  validationErrors: any;

  characters = [];
  characters_loading = true;
  message = '';

  page = 'what-we-do/characters';

  charactersArray = [];

  constructor(private characterService: OurCharactersService,
              private route: ActivatedRoute,
              private router: Router,
              private notifyService: NotifyService) {
  }

  ngOnInit() {
    this.getFormData(this.id);
    this.getCharacterListing();
  }

  private getFormData(id) {
    this.id = id;
    if (this.id > 0) {
      this.pageTitle = 'Edit Character';
    }

    this.characterService.getCharacterFormData(id)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.characterData = res.data.character;
          this.initForm();

          this.form_loading = false;
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {});
  }

  private initForm() {
    const data = this.characterData;

    this.characterForm = new FormGroup({
      'id': new FormControl(data.id),
      'title': new FormControl(data.title),
      'likes_text': new FormControl(data.likes_text),
      'dislikes_text': new FormControl(data.dislikes_text),
      'hobbies_text': new FormControl(data.hobbies_text),
      'personality_text': new FormControl(data.personality_text),
      'favourites_text': new FormControl(data.favourites_text),
      'media_path': new FormControl(data.media_path),
      'order': new FormControl(data.order),
    });
  }

  submit() {
    this.formProcessing = true;
    this.validationErrors = {};

    const formData = this.characterForm.getRawValue();

    this.characterService.submitCharacterForm(formData)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
          this.formProcessing = false;
          this.id = 0;
          this.pageTitle = 'Add Character';
          this.getFormData(this.id);
          this.getCharacterListing();
        } else {
          this.formProcessing = false;
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {
        this.formProcessing = false;
        if (error.status === 422) {
          this.validationErrors = error.error.errors;
        } else {
        }
      });
  }

  private getCharacterListing() {
    this.characters = [];

    this.characterService.CharacterListing()
      .then(
        (res: ApiResponse) => {
          if (res.status === true) {
            this.characters = res.data.result;
            this.charactersArray = this.characters;
            this.message = res.message;
            this.characters_loading = false;
          } else {
            this.notifyService.error(res.message);
          }
        }
      )
      .catch((error: any) => {});
  }

  openConfirmsSwal(id) {
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
        this.characterService.deleteCharacter(id)
          .then((res: ApiResponse) => {
            if (res.status === true) {
              this.notifyService.success(res.message);
              this.getCharacterListing();
            } else {
              this.notifyService.error(res.message);
            }
          })
          .catch((error: any) => {});
      }
    });
  }

  submitOrder() {
    const data = {
      'characters': JSON.stringify(this.charactersArray),
    };
    this.characterService.submitCharacterOrderForm(data)
      .then((res: ApiResponse) => {
        if (res.status === true) {
          this.notifyService.success(res.message);
        } else {
          this.notifyService.error(res.message);
        }
      })
      .catch((error: any) => {
        this.formProcessing = false;
        if (error.status === 422) {
          this.validationErrors = error.error.errors;
        } else {
        }
      });
  }

  updateCharactersModal(id) {
    this.flags = !this.flags;
    this.parent_id = id;
  }
}
