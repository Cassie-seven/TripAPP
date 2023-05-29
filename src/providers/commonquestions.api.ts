import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonQuestionsApi extends ApiBase {
    constructor(public http: Http) {
        super(http);
    }

    public commonquestions(search_condition_json, showLoadingModal: boolean = true) {
        return super.postRequest(search_condition_json, "commonquestionsapi/commonquestionsdata", false, showLoadingModal);
    }   

    public commonquestionsdatadetail(search_condition_json, showLoadingModal: boolean = true) {
        return super.postRequest(search_condition_json, "commonquestionsapi/commonquestionsdatadetail", false, showLoadingModal);
    }  
}
