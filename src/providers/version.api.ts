import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VersionApi extends ApiBase {

    constructor(public http: Http) {
        super(http);
    }

    public apkupdate(data, showLoadingModal: boolean = true) {
        return super.postRequest(data, "commonapi/apkversion", false, showLoadingModal);

    }
}
