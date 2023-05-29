import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MemberApi extends ApiBase {

  constructor(public http: Http) {
    super(http);    
  }

  //Send Login Verify Code and Validate mobile
  public sendLoginVerifyCode(mobile, showLoadingModal: boolean = true) {
    var data = { mobile: mobile };
    return super.postRequest(data, "member/sendloginverifycode", false, showLoadingModal);
  }

  //手机与验证码登录
  public moblieVerifyCodeLogin(mobile, verifycode, showLoadingModal: boolean = true) {
    var data = { mobile: mobile, verifycode: verifycode };
    return super.postRequest(data, "member/moblieVerifyCodeLogin", false, showLoadingModal);
  }

  //Send Register Verify Code and Validate mobile
  public sendRegisterVerifyCode(mobile, showLoadingModal: boolean = true) {
    var data = { mobile: mobile };
    return super.postRequest(data, "member/sendregisterverifycode", false, showLoadingModal);
  }

  public sendWetchatBindMobileVerifyCode(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "member/sendwetchatbindmobileverifycode", false, showLoadingModal);
  }

  public login(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "proxyapi/login", false, showLoadingModal);
    // return super.postRequest(data, "member/applogin", false, showLoadingModal);
  }

  public AddImeiExamnie(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "proxyapi/AddImeiExamnie", false, showLoadingModal);
    // return super.postRequest(data, "caseapi/AddImeiExamnie", false, showLoadingModal);
  }
}
