import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseProcessPage } from './case-process';

@NgModule({
  declarations: [
    CaseProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseProcessPage),
  ],
})
export class CaseProcessPageModule {}
