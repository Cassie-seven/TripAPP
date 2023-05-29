import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http'; //for 3.0

// 导入 loginPage
import {LoginPage} from "../pages/login/login";
// 导入 caseDetailsPage
import { CaseDetailsPage } from "../pages/case-details/case-details";
//导入 CaseSumbitPage
import { CaseSumbitPage } from "../pages/case-sumbit/case-sumbit";
import { ContactSettingPage } from "../pages/contact/contact-setting/contact-setting";
import { ContactUsPage } from "../pages/contact/contact-us/contact-us";
import { UserFeedbackPage } from "../pages/contact/user-feedback/user-feedback";
import { UserTripPage } from "../pages/contact/user-trip/user-trip";
import { UserMessagePage } from "../pages/contact/user-message/user-message";
import { UserCasePage } from "../pages/contact/user-case/user-case";
import { UserInfoPage } from "../pages/contact/user-info/user-info";
import { CaseProcessPage } from '../pages/case-process/case-process';
import { OperationExplainPage } from '../pages/operation-explain/operation-explain';
import { UserSystemPage } from '../pages/user-system/user-system';


// 导入相机相册
import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";

import {BackButtonService} from "../services/backButton.service";

import {MediaCapture} from '@ionic-native/media-capture';

//操作文件
import {FileTransfer} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';
import {FileChooser} from '@ionic-native/file-chooser';
import {Transfer} from "@ionic-native/transfer";
import {FilePath} from "@ionic-native/file-path";

import {AndroidPermissions} from "@ionic-native/android-permissions";
import {Uid} from "@ionic-native/uid";

import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

import { Device } from '@ionic-native/device';





@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CaseDetailsPage,
    CaseSumbitPage,
    ContactSettingPage,
    ContactUsPage,
    UserFeedbackPage,
    UserTripPage,
    UserMessagePage,
    UserCasePage,
    UserInfoPage,
    CaseProcessPage,
    OperationExplainPage,
    UserSystemPage
  ],
  imports: [
    HttpModule, //for 3.0
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CaseDetailsPage,
    CaseSumbitPage,
    ContactSettingPage,
    ContactUsPage,
    UserFeedbackPage,
    UserTripPage,
    UserMessagePage,
    UserCasePage,
    UserInfoPage,
    CaseProcessPage,
    OperationExplainPage,
    UserSystemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    BackButtonService,
    FileTransfer,
    Transfer,
    MediaCapture,
    File,
    FileChooser,
    FilePath,
    AndroidPermissions,
    Uid,
    Network,
    Geolocation,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
