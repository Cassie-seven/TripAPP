import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController,LoadingController } from 'ionic-angular';
import {AppUtil} from '../../../app/app.util';
import {ApiConfig} from '../../../app/api.config';
import { CaseListApi } from '../../../providers/caselist.api';
/**
 * Generated class for the UserFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-feedback',
  templateUrl: 'user-feedback.html',
  providers: [CaseListApi]
})
export class UserFeedbackPage {
  userFeedback = "";
  userEmail = "";
  public loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    private toastCtrl: ToastController,public loadingCtrl: LoadingController,public caselistApi: CaseListApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserFeedbackPage');
  }

  goBack () {
    this.viewCtrl.dismiss();
  }

  submit() {
    if (this.userFeedback.length < 10){
      this.msgAlter("输入的建议字数不够~~", this.toastCtrl,'loginout'); 
        return;
    }

    if (!AppUtil.IsEmail(this.userEmail)) {
      this.msgAlter("请输入正确的邮箱~~", this.toastCtrl,'loginout'); 
        return;
    }
    
    //加载数据列表
    let postData = { member_id : ApiConfig.RID,content:this.userFeedback,email:this.userEmail };
    this.show();
    this.caselistApi.AddSuggest(postData).then(result => {   
      if (result.code == 0 && result.data != null) {    
        this.msgAlter("建议提交成功", this.toastCtrl,'success'); 
        this.hide();      
      }
      else {
        this.hide();
        this.msgAlter("建议提交失败", this.toastCtrl,'error'); 
        return;
      }
    }).catch(err => {
      this.msgAlter("提交建议异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });
    this.dismiss();
  }
  public msgAlter(msg: string, toastCtrl,status: string) {
    let msgpop = toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: status
    });
    msgpop.present();   
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  show() {
    this.loading = this.loadingCtrl.create({
      content: '数据拼命加载中...'
    });
    this.loading.present();
  }
  // 隐藏loading
  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
