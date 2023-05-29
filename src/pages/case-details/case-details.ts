import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ModalController,LoadingController,ToastController  } from 'ionic-angular';
import { CaseSumbitPage } from "../case-sumbit/case-sumbit";
import { CaseProcessPage } from "../case-process/case-process";
import { CaseListApi } from '../../providers/caselist.api';
import {ApiConfig} from '../../app/api.config';
declare const baidu_location: any
declare var BMap;
/**
 * Generated class for the CaseDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-case-details',
  templateUrl: 'case-details.html',
  providers: [CaseListApi]
})
export class CaseDetailsPage {
  //按钮的颜色
  btnColor: string = "#666";
  btnTxt: string = "开始外访";
  btnFontColor: string = "#fff";
  btnBackGroundColog: string = "";
  public loading: any;
  datalist = [];// 接收数据
  reminderlist = [];//催收数据
  CasePhoneRedList = [];
  CaseClubList = [];
  CaseJointList = [];
  CaseRemarkList=[];
  case_id = '';//案件ID
  case_status = '';//案件状态
  id = '';
  uname = "";
  result = "";
  caseAdress = "";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public caselistApi: CaseListApi,
    public toastCtrl: ToastController
    ) {
      this.case_id = this.navParams.get('case_id');
      this.case_status = this.navParams.get('status');
      this.id = this.navParams.get('mc_id');
      this.result = this.navParams.get('result');
      if(this.case_status == 'A') {
        this.btnTxt = '开始外访'
      }
      if(this.case_status == 'B') {
        this.btnTxt = '查看外访进度'
        this.btnColor = '#1c1c1c'
      }
      if(this.case_status == 'C') {
        if(this.result == '承诺还款') {
          this.btnTxt = '申请二次外访'
          this.btnColor = '#2d3d54'
        }
        else{
          this.btnTxt = '案件完成'
          this.btnColor = '#009a9a'
        }       
      } 
      this.getCaseDetail(this.id);              
  }

  async drawMap(name,position) {
    var map = new BMap.Map(name);
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    map.disableDragging();//禁止拖拽
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
     myGeo.getPoint(position, function(point){
      if (point) {
        map.centerAndZoom(point, 14);
        map.addOverlay(new BMap.Marker(point));
      }else{
        alert("您选择地址没有解析到结果!");
      }
    }, "深圳市");
    
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
  async ionViewDidLoad() {
    this.uname = window.localStorage.getItem('login_name');     
  }

  async getCaseDetail(id) {
    let that = this;
    let postData = { id: id }; 
    this.show();
    this.caselistApi.getcasedetail(postData).then(async result => {   
      if (result.code == 0 && result.data != null) {   
        this.datalist = result.data; 
        this.caseAdress = result.data.address;
        // setTimeout( async () => {
        //   await that.drawMap('map',result.data.address);  
        // }, 100); 
        this.hide();
        await this.getcasereminder();    
        await this.GetCasePhoneRed();
        await this.GetCaseClue();  
        await this.GetCaseJoint();
        await this.GetCaseRemark();
        await this.drawMap(this.id,this.caseAdress);       
      }
      else {
        this.hide();
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      this.msgAlter("获取案件详情请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });     
  }
  async getcasereminder() {
    this.show();
    let postData = { case_id: this.case_id };
    this.caselistApi.getcasereminder(postData).then(result => {   
      if (result.code == 0 && result.data != null) {   
        this.reminderlist = result.data.list; 
        this.hide();     
      }
      else {
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout');
        this.hide();
        return;
      }
    }).catch(err => {
      this.msgAlter("获取案件催记请求异常1 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });
  }
  async GetCasePhoneRed() {
    let postData = { case_id: this.case_id };
    this.caselistApi.GetCasePhoneRed(postData).then(result => {   
      if (result.code == 0 && result.data != null) {   
        this.CasePhoneRedList = result.data.list;    
      }
      else {
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      this.msgAlter("获取案件催记请求异常2 请检查网络设置或联系管理员", this.toastCtrl,'error');
      return;
    });
  }
  async GetCaseRemark() {
    let postData = { case_id: this.case_id };
    this.caselistApi.GetCaseRemark(postData).then(result => {   
      if (result.code == 0 && result.data != null) {   
        this.CaseRemarkList = result.data.list;    
      }
      else {
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      this.msgAlter("获取案件催记请求异常2 请检查网络设置或联系管理员", this.toastCtrl,'error');
      return;
    });
  }
  async GetCaseClue() {
    let postData = { case_id: this.case_id };
    this.caselistApi.GetCaseClue(postData).then(result => {   
      if (result.code == 0 && result.data != null) {   
        this.CaseClubList = result.data.list;    
      }
      else {
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      this.msgAlter("获取案件线索异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      return;
    });
  }
  async GetCaseJoint() {
    let postData = { case_id: this.case_id };
    this.caselistApi.GetCaseJoint(postData).then(result => {   
      if (result.code == 0 && result.data != null) {   
        this.CaseJointList = result.data.list;    
      }
      else {
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      this.msgAlter("获取案件线索异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      return;
    });
  }
  public msgAlter(msg: string, toastCtrl,status: string) {
    let msgpop = toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: status
    });
    msgpop.present();   
  }

  goBack() {
    this.viewCtrl.dismiss();  
  }

  _startInterview() {
    if(this.case_status == 'C') {
      if(this.btnTxt == '申请二次外访') {
        this.showConfirm('确定申请此案件二次外访吗?',2);
      }
      return;
    }
    if(this.btnTxt == '开始外访') {
      this.showConfirm('确定现在开始外访并更新案件状态吗?',0)
    }
    if(this.btnTxt == '结束外访') {
      this.showConfirm('确定现在结束外访? 点击确定则获取当前位置并跳转提交资料',1)
    } 
    if(this.btnTxt == '查看外访进度') {
      this.viewCtrl.dismiss(); 
      let modal = this.modalCtrl.create(CaseProcessPage,{case_id:this.case_id,id:this.id,data:this.datalist});
      modal.present();
    }
    
  }

  showConfirm(message,flag) {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: message,
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
            // this.getarea()//获取当前位置信息
            if(flag == 0) {
              let postData = { 
                case_id: this.case_id,
                status: 'B',
                id: this.id, 
                member_id : ApiConfig.RID
              };
              this.show();
              this.caselistApi.updatecasestatus(postData).then(result => {   
                if (result.code == 0) {                    
                  this.hide();   
                  this.viewCtrl.dismiss(); 
                  let modal = this.modalCtrl.create(CaseProcessPage,{case_id: this.case_id,id:this.id,data:this.datalist});
                  modal.present();
                  this.btnTxt = '查看外访进度';    
                }
                // if(result.code == 2) {
                //   this.hide();  
                //   this.msgAlter("一次只能进行一个案件", this.toastCtrl,'loginout');
                //   return;
                // }
                if(result.code == 1) {
                  this.hide();
                  this.msgAlter("修改状态值失败", this.toastCtrl,'loginout');
                  return;
                }                  
              }).catch(err => {
                this.msgAlter("修改案件状态请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
                this.hide();
                return;
              });
            }
            if(flag == 1) {
              //跳转至信息提交页面
              let modal = this.modalCtrl.create(CaseSumbitPage);
              modal.present();
            }
            if(flag == 2) {
              //申请二次外访
              let postData = { 
                member_case_id: this.id,                      
                member_id: ApiConfig.RID
              };
              this.show();
              this.caselistApi.AddVisExamine(postData).then(result => {   
                if (result.code == 0) {                    
                  this.hide(); 
                  this.msgAlter("提交审核成功", this.toastCtrl,'success');     
                }
                
                if(result.code == 1) {
                  this.hide();
                  this.msgAlter("提交审核未成功或已在审核中", this.toastCtrl,'error');
                  return;
                }
                if(result.code == 2) {
                  this.hide();
                  this.msgAlter("申请失败 案件不在期限内", this.toastCtrl,'error');
                  return;
                }                    
              }).catch(err => {
                this.msgAlter("提交审核请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
                this.hide();
                return;
              });
            }
          }
        }
      ]
    });
    confirm.present();
  }

   getarea(){
    let that = this;
    if (typeof baidu_location === "undefined") { 
      alert("baidumap_location is undefined"); 
      return; 
    }; 
    baidu_location.getCurrentPosition(function (result) { 
      that.myaddr(result.longitude,result.latitude);
    }, function (error) { 
      alert(error); 
    });
  }
  
  myaddr(lontitude,latitude){
    let that = this;
    var point = new BMap.Point(lontitude, latitude);//34.7534880000,113.6313490000
    //把地址在地图上标出来
    var geoc = new BMap.Geocoder();
    geoc.getLocation(point, function(rs){
      var addrmsg=rs.address;
      that.showPositionInfo(addrmsg)            
    });   
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
