import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {SettingService} from "../../services/setting.service";
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
      SharedModule
  ],
  declarations: [ChangePasswordComponent],
    providers: [
        SettingService
    ]
})
export class SettingsModule { }
