import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCasePage } from './user-case';

@NgModule({
  declarations: [
    UserCasePage,
  ],
  imports: [
    IonicPageModule.forChild(UserCasePage),
  ],
})
export class UserCasePageModule {}
