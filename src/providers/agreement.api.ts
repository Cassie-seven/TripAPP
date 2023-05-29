import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AgreementApi extends ApiBase {
    constructor(public http: Http) {
        super(http);
    }

    public getagreement(search_condition_json, showLoadingModal: boolean = true) {
        return super.postRequest(search_condition_json, "agreementapi/agreementcontent", false, showLoadingModal);
    }   

}
