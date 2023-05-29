import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperationExplainPage } from './operation-explain';

@NgModule({
  declarations: [
    OperationExplainPage,
  ],
  imports: [
    IonicPageModule.forChild(OperationExplainPage),
  ],
})
export class OperationExplainPageModule {}
