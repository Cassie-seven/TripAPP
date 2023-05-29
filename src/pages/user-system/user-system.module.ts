import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSystemPage } from './user-system';

@NgModule({
  declarations: [
    UserSystemPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSystemPage),
  ],
})
export class UserSystemPageModule {}
