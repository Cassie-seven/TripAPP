import { Component } from '@angular/core';
import { Platform ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import {AppLang} from './app.lang';
import {AppUtil} from './app.util';
import {AppMember} from '../app/app.member';
import {MemberApi} from '../providers/member.api';

// 导入 loginPage
import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html',
  providers: [MemberApi]
})
export class MyApp {
  member = AppMember.GetInstance();
  rootPage = LoginPage;
  Lang = AppLang.Lang;
  passwordValue = "";
  loginValue = "";
  Util = AppUtil;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public toastCtrl: ToastController,public memberApi: MemberApi) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      statusBar.styleLightContent();
      statusBar.overlaysWebView(true);
      splashScreen.hide();
    });
    
  }
  gotoLogin() {
    if (this.loginValue.length < 4 || this.passwordValue.length < 4) {
        this.msgAlter(this.Lang["inputmobilenoorpassword"], this.toastCtrl);
        return;
    }
    // return;
    var _self = this;
    this.member.Login(this.loginValue, AppUtil.ToBase64(this.passwordValue), this.memberApi, this.toastCtrl, function(){
        if (_self.member.IsLogined()) {
          // _self.refreshHomePage();
        }
    });
  }
  

  public msgAlter(msg: string, toastCtrl) {
    let msgpop = toastCtrl.create({
        message: msg,
        duration: 2000
    });
    msgpop.present();
  }
}
