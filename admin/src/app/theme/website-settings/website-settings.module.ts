import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteSettingsRoutingModule } from './website-settings-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {SanitizeUrlPipe} from '../../pipes/sanitize-url.pipe';
import {DragulaModule} from 'ng2-dragula';
import {UiSwitchModule} from 'ngx-ui-switch'; // 'ng2-ui-switch/dist';

import {AgmCoreModule} from '@agm/core';
import { FooterSectionComponent } from './footer-section/footer-section.component';

@NgModule({
  imports: [
    CommonModule,
    WebsiteSettingsRoutingModule,
    SharedModule,
    DragulaModule,
    UiSwitchModule,
    // AgmCoreModule.forRoot({apiKey: 'AIzaSyCIgYaIy65wTtiSqN0S6L4Zd4RBUR0aVCc', libraries: ['places']}),
  ],
  declarations: [FooterSectionComponent],
})
export class WebsiteSettingsModule { }
