import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,LoadingController,ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { CaseListApi } from '../../../providers/caselist.api';
import {ApiConfig} from '../../../app/api.config';
declare const baidu_location: any
declare var BMap;
/**
 * Generated class for the UserCasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-case',
  templateUrl: 'user-case.html',
  providers: [CaseListApi,Network]
})
export class UserCasePage {
  start_position = "";
  end_position = "";
  public loading: any;
  datalist = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public caselistApi: CaseListApi,
    public toastCtrl: ToastController,
    private network: Network) {
      this.GetDailyEndInfo();
  }

  ionViewDidLoad() {
    
  }
  goBack() {
    this.viewCtrl.dismiss();
  }

  async GetDailyEndInfo() {  
    let that = this; 
    this.show();
    let postData = {
      member_id : ApiConfig.RID
    }
    this.caselistApi.GetDailyEndInfo(postData).then(result => {  
      if (result.code == 0) { 
        if(result.data.start_position == undefined){
          that.start_position ='';
        }
        if(result.data.end_position == undefined){
          that.end_position = '';
          that.hide();
          return;
        }
        that.start_position = result.data.start_position;
        that.end_position = result.data.end_position;
        that.hide() 
      }
      else {
        that.hide();
        that.msgAlter("数据获取失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      that.msgAlter("数据获取异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      that.hide();
      return;
    });
  }


  _startInterview(num) {
    if(num == 1) {
      if(this.start_position != '') {
        this.msgAlter("今日内请不要重复打卡", this.toastCtrl,'error');
        return;
      }
    }
    
    if(num == 2) {
      if(this.end_position != '') {
        this.msgAlter("今日内请不要重复打卡", this.toastCtrl,'error');
        return;
      }
    }
    let that = this;
    let confirm = this.alertCtrl.create({
      title: '当前位置',
      message: '您确定要在当前位置打卡吗?',
      cssClass: 'alertBtn',
      buttons: [  
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },    
        {
          text: '确定',
          handler: async () => {       
            await that.getarea(num);  
          }
        }
      ]
    });
    confirm.present();
  }
  async getarea(num){
    let that = this;
    if (typeof baidu_location === "undefined") {
      alert("baidumap_location is undefined"); 
      return; 
    }; 
    baidu_location.getCurrentPosition(function (result) {
      that.myaddr(result.longitude,result.latitude,num);     
    }, function (error) { 
      alert(error); 
      return;
    });
  }

  myaddr(lontitude,latitude,num){    
    let that = this;
    var point = new BMap.Point(lontitude, latitude);//34.7534880000,113.6313490000
    //把地址在地图上标出来
    var geoc = new BMap.Geocoder();
    geoc.getLocation(point, function(rs){
      var addrmsg=rs.address;
      if(that.network.type == 'none'){
        that.msgAlter("当前无网络，请检查网络连接", this.toastCtrl,'error'); 
        return;
      }
     if(num == 1){
      that.start_position = addrmsg;
      that.AddMemberCase(addrmsg,lontitude,latitude);
     }
     if(num == 2){
      that.end_position = addrmsg;
      that.UpdateDailyEndInfo(addrmsg,lontitude,latitude);
     }
    }); 
  }

  async AddMemberCase(addrmsg,lontitude,latitude) {  
    let that = this; 
    this.show();
    let postData = {
      member_id : ApiConfig.RID,
      adress: addrmsg,
      start_coordinate: lontitude + "," + latitude
    }
    this.caselistApi.AddMemberCase(postData).then(result => {   
      if (result.code == 0) {  
        that.showPositionInfo(addrmsg)  
        this.hide() 
      }
      else {
        this.hide();
        this.msgAlter("数据添加失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      this.msgAlter("数据添加异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });
  }

  async UpdateDailyEndInfo(addrmsg,lontitude,latitude) {  
    let that = this; 
    this.show();
    let postData = {
      member_id : ApiConfig.RID,
      end_position: addrmsg,
      end_coordinate: lontitude + "," + latitude
    }
    this.caselistApi.UpdateDailyEndInfo(postData).then(result => {   
      if (result.code == 0) {  
        that.showPositionInfo(addrmsg)  
        this.hide() 
      }
      else {
        this.hide();
        this.msgAlter("数据添加失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      this.msgAlter("数据添加异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });
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

  public msgAlter(msg: string, toastCtrl,status: string) {
    let msgpop = toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: status
    });
    msgpop.present();   
  }

  showPositionInfo(postion) {
    let confirm = this.alertCtrl.create({
      title: '当前位置',
      message: postion,
      cssClass: 'alertBtn',
      buttons: [  
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },    
        {
          text: '确定',
          handler: () => {
             
          }
        }
      ]
    });
    confirm.present();
  }
}
