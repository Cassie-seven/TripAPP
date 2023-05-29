import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CouponApi extends ApiBase {
  constructor(public http: Http) {
    super(http);
  }
  //显示优惠券，不需要传入参数，返回A、U和N三种状态的优惠券信息，
  public show(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "couponapi/show", false, showLoadingModal);
  }
  //优惠券支付时调用有效优惠券列表，传入购买的课程 course_id
  public showvalid(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "couponapi/showvalid", false, showLoadingModal);
  }
  //领取优惠券传入优惠券 coupon_id
  public get(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "couponapi/get", false, showLoadingModal);
  }
}
