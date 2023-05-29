import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactSettingPage } from './contact-setting';

@NgModule({
  declarations: [
    ContactSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactSettingPage),
  ],
})
export class ContactSettingPageModule {}
