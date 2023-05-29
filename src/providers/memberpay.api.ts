import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MemberpayApi extends ApiBase {

    constructor(public http: Http) {
        super(http);
    }

    //获取会员支付列表，传入对应的搜索条件
    public memberpayrecord(search_condition_json, showLoadingModal: boolean = true) {
        return super.postRequest(search_condition_json, "memberpay/memberpayrecord", false, showLoadingModal);
    }

    //获取会员支付详情, 传入对应的id
    public get(id, showLoadingModal: boolean = true) {
        let json = { 'id': id };
        return super.postRequest(json, "memberpay/get", false, showLoadingModal);
    }

    public updatepay(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/updatepay", false, showLoadingModal);
    }

    //支付宝支付
    public alipaynotify(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/alipaynotify", false, showLoadingModal);
    }

    //生成支付签名
    public alipaygenerateorder(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/alipaygenerateorder", false, showLoadingModal);

    }


    public debugpayment(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/debugpayment", false, showLoadingModal);

    }

    public cancelorder(orderid, showLoadingModal: boolean = true) {
        var data = { orderid: orderid };
        return super.postRequest(data, "memberpay/cancelorder", false, showLoadingModal);
    }


    //微信支付
    public weixinpaynotify(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/weixinpaynotify", false, showLoadingModal);
    }

    public weixinpaygenerateorder(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/weixinpaygenerateorder", false, showLoadingModal);
    }

    public weixinMPPayGenerateOrder(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/weixinmppaygenerateorder", false, showLoadingModal);
    }

    public weixinPayOrderQuery(tradeno, paytype, showLoadingModal: boolean = true) {
        var data = { 'tradeno': tradeno, 'paytype': paytype }; //APP, JSSDK
        return super.postRequest(data, "memberpay/weixinpayorderquery", false, showLoadingModal);
    }

    //后台校验收据与更新订单,用户物品
    public appleiappay(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/appleiappay", false, showLoadingModal);
    }

    //申请发票
    public applyinvoice(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/applyinvoice", false, showLoadingModal);
    }

    //赠品
    public memberGiftGivenDetail(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/MemberGiftGivenDetail", false, showLoadingModal);
    }

    public memberGiftGivenList(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "memberpay/MemberGiftGivenList", false, showLoadingModal);
    }

    public memberReceiveGift(data, showLoadingModal: boolean = true) {
      return super.postRequest(data, "memberpay/MemberReceiveGift", false, showLoadingModal);
    }
}
