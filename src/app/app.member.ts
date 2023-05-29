import { Component} from '@angular/core';
import {AppUtil} from './app.util';
import {AppStorage} from './app.storage';
import {ApiConfig} from './api.config';
import {AppLang} from './app.lang';
import {MemberApi} from '../providers/member.api';
export class AppMember {
  private static instance: AppMember;
  public Lang = AppLang.Lang;
  public isLogin = false;
  public isNotSetPassword = false;
  public id = 0;
  public name = "";
  public loginname = "";
  public realname = "";
  public realname_authed = 0;
  public idcard = "";
  public mobile = "";
  public photo = "";
  public openid = "";
  public title = "";
  public company = "";
  public custom_code = "";
  public companyname = "";
  public credits = "";
  public practice_number = "";
  public sex = this.Lang["female"];
  public token = "";
  public isthridLogin = false;
  public headportrait = "";
  public auth_type = "S";
  public backgroundPicture = "";

  public static GetInstance() {
    if (AppMember.instance == null) {
      AppMember.instance = new AppMember();
      var userinfo = AppStorage.getJSONItem('lzloginuserInfo');
      if (userinfo && userinfo != null && (!userinfo["isthridLogin"] || (userinfo["isthridLogin"] && userinfo["mobile"].length > 0))) {
        AppMember.instance.updateInfo(userinfo, userinfo["isthridLogin"], false);
        ApiConfig.SetToken(AppMember.instance.token, AppMember.instance.id,AppMember.instance.name);

      }
    }
    return AppMember.instance;
  }
  public Login(username, password, memberApi, toastCtrl, callback) {
    console.log(2)
    let postData = { username: username, password: password };
    memberApi.login(postData).then(result => {
      if (result.code == 0 && result.data != null) {
        ApiConfig.SetToken(result.data.token, result.data.id,result.data.name);
        this.updateInfo(result.data, false, true);
        callback();
      }
      else {
        this.msgAlter(this.Lang["inputmobilenoorpassword"], toastCtrl);
        return;
      }

    });

  }

  public updatedatainfo(name, title, company, sex, memberApi, toastCtrl) {
    let postData = { name: name, title: title, company: company, sex: sex};
    memberApi.updatememberinfo(postData).then(result => {
      if (result.code == 0) {
        this.msgAlter(this.Lang["updatesuc"], toastCtrl);
      }
      else {
        this.msgAlter(this.Lang["noupdata"], toastCtrl);
        return;
      }

    });
  }
  public updaterealnameinfo(realname, idcard, memberApi, toastCtrl) {
    let postData = { realname: realname, idcard: idcard };
    memberApi.updatememberrealnameinfo(postData).then(result => {
      if (result.code == 0) {
        this.msgAlter(this.Lang["updatesuc"], toastCtrl);
      }
      else {
        this.msgAlter(this.Lang["noupdata"], toastCtrl);
        return;
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
  public updateInfo(info, isthirdLogin, isSaveLocal) {
    this.id = info.id;
    this.token = info.token;
    this.name = info.name;
    this.loginname = info.loginname;
    this.realname = info.realname;
    this.realname_authed = info.realname_authed;
    this.idcard = info.idcard;
    this.mobile = info.mobile;
    this.title = info.title;
    this.practice_number = info.practice_number;
    this.openid = info.openid;
    this.company = info.company;
    this.custom_code = info.custom_code || '';
    this.credits = info.credits;
    this.auth_type = info.auth_type;
    this.sex = info.sex;
    this.isLogin = true;

    //idcard/realname即使脱敏了也不应保存本地
    if (isSaveLocal) {
      AppStorage.SaveItem('lzloginuserInfo', info);
    }
    this.updateheadportrait(info.photo, isthirdLogin);
  }
  public updateInfo_vistor(id, token) {
    this.id = id;
    this.token = token;
    this.isLogin = true;
  }
  public updateheadportrait(photoname, isthridlogin) {
    if (!photoname && photoname != "") {
      return;
    }
    this.headportrait = photoname;
    this.photo = photoname;
    if (this.photo.length == 0) {
      this.headportrait = AppUtil.formatLocalImgPath("assets/img/plogin.png");
    }

    //this.backgroundPicture = this.headportrait;

    //The backgroundPicture is currently written
    this.backgroundPicture = AppUtil.formatLocalImgPath("assets/img/member_bg.jpg");
  }

  public getheadportrait(photoname) {
    if (photoname.length == 0) {
      photoname = AppUtil.formatLocalImgPath("assets/img/plogin.png");
    }

    return photoname;
  }

  public IsLogined() {
    return this.isLogin;
  }
  public logout() {
    AppStorage.deleteItem('lzloginuserInfo');
    this.id = 0;
    this.name = "";
    this.realname = "";
    this.idcard = "";
    this.mobile = "";
    this.photo = "";
    this.title = "";
    this.company = "";
    this.custom_code = "";
    this.credits = "";
    this.sex = "";
    this.loginname = "";
    this.token = "";
    this.auth_type = "";
    this.practice_number = "";
    this.openid = "";
    this.realname_authed = 0;
    this.isLogin = false;
    this.isthridLogin = false;
    ApiConfig.ReSetToken();
  }

}
