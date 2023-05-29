import { Loading} from 'ionic-angular';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../app/api.config';
import { AppUtil } from '../app/app.util';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class ApiBase {

    constructor(public http: Http) {

    }

    
//获取广告列表，传入对应的搜索条件
public postRequest(jsondata, apiurl, isAbsoluteUrl, showLoadingModal:boolean=true) {
    var url = apiurl; //"configapi/otherconfig";
    if (!isAbsoluteUrl) {
        url = ApiConfig.getApiUrl() + apiurl; //"configapi/otherconfig";
    }
    if (jsondata == null) {
        jsondata = {};
    }
    jsondata.appedition = AppUtil.AppEdnSwitchMode == "0" ? AppUtil.AppEdition : "M1";
    var headers = ApiConfig.GetHeader(url, jsondata);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.ParamUrlencoded(jsondata);


        let loading: Loading=null;
        if(showLoadingModal){
          loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                if (ApiConfig.DataLoadedHandle(apiurl, jsondata,res)){
                  if(showLoadingModal){
                     ApiConfig.DimissLoadingModal();
                  }
              
                 return res.json();
              }else{
                return Promise.reject(res);
              }
            })
            .catch(err => {
                if(showLoadingModal){
					           ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle(apiurl, jsondata,err);
            });
    }   
}
