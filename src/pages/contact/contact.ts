import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { ContactSettingPage } from "../contact/contact-setting/contact-setting";
import { ContactUsPage } from "../contact/contact-us/contact-us";
import { UserTripPage } from "../contact/user-trip/user-trip";
import { UserMessagePage } from "../contact/user-message/user-message";
import { UserCasePage } from "../contact/user-case/user-case";
import { UserInfoPage } from "../contact/user-info/user-info";
import { OperationExplainPage } from '../../pages/operation-explain/operation-explain';
import { UserSystemPage } from '../../pages/user-system/user-system';
import {ApiConfig} from '../../app/api.config';

declare const baidu_location: any
declare var BMap;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  pushPage: any;
  name = ApiConfig.NAME
  memberid = ApiConfig.RID
  constructor(public navCtrl: NavController,public modalCtrl: ModalController) {

  }

  gotoSetting() {
    // 界面跳转
    let modal = this.modalCtrl.create(ContactSettingPage);
    modal.present();
  }
  gotoContanctUS() {
    // 界面跳转
    let modal = this.modalCtrl.create(ContactUsPage);
    modal.present();
  }
  gotoUserTrip () {
    // 界面跳转
    let modal = this.modalCtrl.create(UserTripPage);
    modal.present();
  }
  gotoUserMessage () {
    // 界面跳转
    let modal = this.modalCtrl.create(UserMessagePage);
    modal.present();
  }
  gotoUserCase() {
    let modal = this.modalCtrl.create(UserCasePage);
    modal.present();
  }
  gotoUserInfo() {
    let modal = this.modalCtrl.create(UserInfoPage);
    modal.present();
  }
  gotoOperationExplain() {
    let modal = this.modalCtrl.create(OperationExplainPage);
    modal.present();
  }
  gotoUserSystem() {
    let modal = this.modalCtrl.create(UserSystemPage);
    modal.present();
  }
}
