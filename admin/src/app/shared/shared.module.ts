import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ToggleFullScreenDirective} from './fullscreen/toggle-fullscreen.directive';
import {AccordionAnchorDirective} from './accordion/accordionanchor.directive';
import {AccordionLinkDirective} from './accordion/accordionlink.directive';
import {AccordionDirective} from './accordion/accordion.directive';
import {CardToggleDirective} from './card/card-toggle.directive';

import {DataFilterPipe} from './elements/data-filter.pipe';

import {TitleComponent} from '../layout/admin/title/title.component';
import {CardComponent} from './card/card.component';
import {ModalBasicComponent} from './modal-basic/modal-basic.component';
import {ModalAnimationComponent} from './modal-animation/modal-animation.component';
import {SpinnerComponent} from './spinner/spinner.component';

import {ClickOutsideModule} from 'ng-click-outside';
import {SelectModule} from 'ng-select';
import {ToastyModule} from 'ng2-toasty';
import {RecaptchaModule} from 'ng-recaptcha';
//import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {TextMaskModule} from 'angular2-text-mask';
import {UiSwitchModule} from 'ngx-ui-switch';  //'ng2-ui-switch/dist';
import { ModalSendMessageComponent } from './modal-send-message/modal-send-message.component';
import {SanitizeUrlPipe} from '../pipes/sanitize-url.pipe';
import {SlugifyPipe} from '../pipes/slugify.pipe';
import {NoRightClickDirective} from './no-right-click/no-right-click.directive';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    /*NgbModule.forRoot(),*/
	NgbModule,
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    /*ToastyModule.forRoot(),*/
	ToastyModule
  ],
  exports: [
    NgbModule,
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    HttpClientModule,
    PerfectScrollbarModule,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    ClickOutsideModule,
    DataFilterPipe,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    ToastyModule,
    /*RecaptchaModule.forRoot(),*/
    RecaptchaModule,
   /* RecaptchaFormsModule,*/
    TextMaskModule,
    UiSwitchModule,
    ModalSendMessageComponent,
    SanitizeUrlPipe,
    SlugifyPipe,
    NoRightClickDirective,
  ],
  declarations: [
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    DataFilterPipe,
    ModalSendMessageComponent,
    SanitizeUrlPipe,
    SlugifyPipe,
    NoRightClickDirective,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    SlugifyPipe,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {
}
