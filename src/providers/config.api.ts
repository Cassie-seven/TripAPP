import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConfigApi extends ApiBase {

    constructor(public http: Http) {
        super(http);
    }

    
//获取广告列表，传入对应的搜索条件
    public getotherconfig(search_condition_json, showLoadingModal: boolean = true) {
        return super.postRequest(search_condition_json, "configapi/otherconfig", false, showLoadingModal); 
    }   
}
