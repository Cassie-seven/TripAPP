import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

@Injectable()
export class CaseListApi extends ApiBase {

    constructor(public http: Http) {
        super(http);
    }
   
    public getcaselist(data, showLoadingModal: boolean = true) {
        // return super.postRequest(data, "caseapi/getcaselist", false, showLoadingModal);
        return super.postRequest(data, "proxyapi/getcaselist", false, showLoadingModal);
    } 

    public getcasedetail(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/getcasedetail", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/getcasedetail", false, showLoadingModal);
    } 
    public getcasereminder(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/getcasereminder", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/getcasereminder", false, showLoadingModal);
    }

    public updatecasestatus(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/updatecasestatus", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/updatecasestatus", false, showLoadingModal);
    } 

    public getcaseprocess(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/GetCaseProcess", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/GetCaseProcess", false, showLoadingModal);
    } 

    public UpdateMemberCaseStartPostion(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/UpdateMemberCaseStartPostion", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/UpdateMemberCaseStartPostion", false, showLoadingModal);
    } 
    public UpdateMemberCaseEndPostion(data, showLoadingModal: boolean = true) {
        // return super.postRequest(data, "caseapi/UpdateMemberCaseEndPostion", false, showLoadingModal);
        return super.postRequest(data, "proxyapi/UpdateMemberCaseEndPostion", false, showLoadingModal);
    } 
    public File(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/File", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/File", false, showLoadingModal);
    }
    public UploadImage(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/UploadImage", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/UploadImage", false, showLoadingModal);
    }
    public UpdateMemberCaseData(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/UpdateMemberCaseData", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/UpdateMemberCaseData", false, showLoadingModal);
    }
    public AddSuggest(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/AddSuggest", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/AddSuggest", false, showLoadingModal);
    }
    public AddReminder(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/AddReminder", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/AddReminder", false, showLoadingModal);
    }
    public GetCaseRepayment(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/GetCaseRepayment", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/GetCaseRepayment", false, showLoadingModal);
    }
    public GetCasePhoneRed(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/GetCasePhoneRed", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/GetCasePhoneRed", false, showLoadingModal);
    }
    public GetCaseClue(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/GetCaseClue", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/GetCaseClue", false, showLoadingModal);
    }
    public UpdateVisRecord(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/UpdateVisRecord", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/UpdateVisRecord", false, showLoadingModal);
    }
    public AddVisExamine(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/AddVisExamine", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/AddVisExamine", false, showLoadingModal);
    }
    public GetCaseJoint(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/GetCaseJoint", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/GetCaseJoint", false, showLoadingModal);
    }
    public AddMemberCase(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/AddMemberCase", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/AddMemberCase", false, showLoadingModal);
    }
    public GetDailyEndInfo(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/GetDailyEndInfo", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/GetDailyEndInfo", false, showLoadingModal);
    }
    public UpdateDailyEndInfo(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/UpdateDailyEndInfo", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/UpdateDailyEndInfo", false, showLoadingModal);
    }
    public GetCaseRemark(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "proxyapi/GetCaseRemark", false, showLoadingModal);
        // return super.postRequest(data, "caseapi/GetCaseRemark", false, showLoadingModal);
    }
}