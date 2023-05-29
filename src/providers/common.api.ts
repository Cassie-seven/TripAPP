import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonApi extends ApiBase {
    constructor(public http: Http) {
        super(http);
    }
    
//获取广告列表，传入对应的搜索条件
    public gethomedata(search_condition_json, showLoadingModal: boolean = true) {
        return super.postRequest(search_condition_json, "commonapi/homedata", false, showLoadingModal);        
    }   

    public getbannerdata(bannertype, showLoadingModal: boolean = true) {
        var search_condition_json = { bannertype: bannertype };
        return super.postRequest(search_condition_json, "commonapi/bannerdata", false, showLoadingModal);
    }  

    public getglobalconfig(search_condition_json, showLoadingModal: boolean = true) {
        return super.postRequest(search_condition_json, "commonapi/globalconfig", false, showLoadingModal);

    }   
    public getcurrentregion(search_condition_json, showLoadingModal: boolean = true) {
      return super.postRequest(search_condition_json, "commonapi/currentregion", false, showLoadingModal);

    }
    public GetRegionOptionsInfo(search_condition_json, showLoadingModal: boolean = true) {
    return super.postRequest(search_condition_json, "commonapi/regionoptionsinfo", false, showLoadingModal);

    }

    public getcommonconfig(search_condition_json, showLoadingModal: boolean = true) {
      return super.postRequest(search_condition_json, "commonapi/commonconfig", false, showLoadingModal); 
    }
  public getweixinjssdksign(search_condition_json, showLoadingModal: boolean = true) {
    return super.postRequest(search_condition_json, "commonapi/WXJSSdkSignature", false, showLoadingModal);
  }
  public policycolumncourses(search_condition_json, showLoadingModal: boolean = true) {
    return super.postRequest(search_condition_json, "commonapi/policycolumncourses", false, showLoadingModal);
  }
}
