import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MemberMessageApi extends ApiBase {

    constructor(public http: Http) {
        super(http);
    }

    //获取消息
    public getUnReadMessageCount(showLoadingModal: boolean = true) {
        return super.postRequest({}, "membermessageapi/UnReadMessageCountEx", false, showLoadingModal);
    }
 
    public UpdateMessageStatus(sysmsg_timestamp, msgids, msgtype, showLoadingModal: boolean = true) {
        //msgids: 123,234,333
        return super.postRequest({ timestamp: sysmsg_timestamp, msgids:msgids, msgtype:msgtype}, "membermessageapi/UpdateMessageStatus", false, showLoadingModal);
    }

    public getSystemMessage(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "membermessageapi/getSystemMessage", false, showLoadingModal);
    }

    public getUserMessage(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "membermessageapi/getUserMessage", false, showLoadingModal);
    }
}
