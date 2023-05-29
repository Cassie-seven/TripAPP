import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTripPage } from './user-trip';

@NgModule({
  declarations: [
    UserTripPage,
  ],
  imports: [
    IonicPageModule.forChild(UserTripPage),
  ],
})
export class UserTripPageModule {}
