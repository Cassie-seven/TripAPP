import { Component } from '@angular/core';
import { ModalController, ToastController,LoadingController,AlertController} from 'ionic-angular';
import {MemberApi} from '../../providers/member.api';
import {AppUtil} from '../../app/app.util';
import {AppMember} from '../../app/app.member';
import {ApiConfig} from '../../app/api.config';
import {AppLang} from '../../app/app.lang';
import {AppStorage} from '../../app/app.storage';
import { TabsPage} from "../tabs/tabs";
import { Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/backButton.service";
import { StatusBar } from '@ionic-native/status-bar';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {Uid} from "@ionic-native/uid";
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
// import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [MemberApi,Network]
})
export class LoginPage {
  Util = AppUtil;
  member = AppMember.GetInstance();
  public Lang = AppLang.Lang;
  public isLogin = false;
  public isNotSetPassword = false;
  public id = 0;
  public name = "";
  public loginname = "";
  public realname = "";
  public realname_authed = 0;
  public idcard = "";
  public mobile = "";
  public photo = "";
  public openid = "";
  public title = "";
  public company = "";
  public custom_code = "";
  public companyname = "";
  public credits = "";
  public practice_number = "";
  public sex = this.Lang["female"];
  public token = "";
  public isthridLogin = false;
  public headportrait = "";
  public auth_type = "S";
  public backgroundPicture = "";

  public isRemember: boolean = false;
  public isShow: boolean = false;
  public loading: any;

  iconStyle: object = {'color':'#488aff','font-size':'1.4em'};

  imei = "";//手机唯一标识码
  user_name = "";
  uname ="";

  constructor(public modalCtrl: ModalController,public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,public memberApi: MemberApi,private backButtonService: BackButtonService,
              private platform: Platform,public statusBar: StatusBar,
              private uid: Uid, 
              private androidPermissions: AndroidPermissions,
              public alertCtrl: AlertController,
              private network: Network,
              private device: Device
              ) {
                this.statusBar.show();
                var self = this;
                setTimeout(function () { //加定时器是因为有时候状态栏部分会下来 (不用ionViewWillLeave和ionViewDidLeave的时间差是由于他们时间差大概400-500ms太大了)
                  self.statusBar.overlaysWebView(true);
                }, 100);
                
                this.platform.ready().then(() => {
                this.backButtonService.registerBackButtonAction(null);
              });
              // 获取设备imei码
              this.getImei().then( x=> {
                //andiord 10 以上无法获取IMEI码  但是能够获取到UUID（唯一标识码） 如果获取不到 就用UUID
                if(x == 'null' || x == null) {
                  this.imei = this.device.uuid;
                  return;
                }
                if(x == 'undefined'){
                  alert("获取设备Imei码权限成功,请退出应用重新登录");
                  return;
                }
                this.imei = x;
              })
              // this.imei = '860044042905577'            
  }
  
  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
   
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
   
      if (!result.hasPermission) {
        alert('Permissions required');
        throw new Error('Permissions required');
      }
   
      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
   
     return this.uid.IMEI
   }

  ionViewDidLoad() {  
    if(this.network.type == 'none') {
      this.msgAlter("当前无网络，请检查网络连接", this.toastCtrl,'error'); 
    }
    this.uname = window.localStorage.getItem('login_name');
  }

  show() {
    this.loading = this.loadingCtrl.create({
      content: '登录中...'
    });
    this.loading.present();
  }
  // 隐藏loading
  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  _login(username: HTMLInputElement, password: HTMLInputElement){

    if (username.value.length === 0){
      this.msgAlter("请输入用户名", this.toastCtrl,'error'); 
      return false;
    }

    if (password.value.length === 0){
      this.msgAlter("请输入密码", this.toastCtrl,'error'); 
      return false;
    }
   
    this.Login(username.value, AppUtil.ToBase64(password.value), this.toastCtrl);   
  }


  public Login(username, password,toastCtrl) {   
    this.user_name = username;
    let that= this;
    let postData = { username: username, password: password,imei: this.imei,version:'2.0.8' };
    this.show();
    this.memberApi.login(postData).then(result => {  
      if (result.code == 0 && result.data != null) {
        window.localStorage.setItem('login_name',result.data.name);
        ApiConfig.SetToken(result.data.token, result.data.id,result.data.name);
        this.updateInfo(result.data, false, true);
        // this.msgAlter("登录成功", toastCtrl,'success'); 
        // 界面跳转
        let modal = this.modalCtrl.create(TabsPage);
        modal.present();
        this.hide();
      }
      else {
        if(result.code == 3) {
          let confirm = this.alertCtrl.create({
            title: '提示',
            message: '当前设备未经授权或授权失败,是否立即提交申请进行审核?',
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
                  let postData = { user_name: this.user_name, imei: this.imei };
                  that.memberApi.AddImeiExamnie(postData).then(result => { 
                    if (result.code == 0 && result.data != null) {
                      this.msgAlter("提交申请成功", toastCtrl,'success'); 
                    }
                    else{
                      this.msgAlter("提交申请失败，请稍后再试", toastCtrl,'error'); 
                    }
                  }).catch(err => {
                    that.msgAlter("提交申请请求异常，请检查网络设置或联系管理员", that.toastCtrl,'error');
                    this.hide();
                    return;
                  }); 
                }
              }
            ]
          });
          confirm.present();
          this.hide();          
          return;
        }
        if(result.code == 2) {
          this.msgAlter("设备审核中,请耐心等待", toastCtrl,'error'); 
          this.hide();          
          return;
        }
        if(result.code == 5) {
          this.msgAlter("设备审核未通过,请联系管理员", toastCtrl,'error'); 
          this.hide();          
          return;
        }
        if(result.code == 3) {
          this.hide();          
          return;
        }
        if(result.code == 6) {
          this.msgAlter("当前版本不是最新版本", toastCtrl,'error'); 
          this.hide();          
          return;
        }
        this.hide();
        this.msgAlter("用户名或密码错误", toastCtrl,'error'); 
        return;
      }
    }).catch(err => {
      that.msgAlter("登录请求异常，请检查网络设置或联系管理员", that.toastCtrl,'error');
      this.hide();
      return;
    }); 
  }

  public updateInfo(info, isthirdLogin, isSaveLocal) {
    this.id = info.id;
    this.token = info.token;
    this.name = info.name;
    this.loginname = info.loginname;   
    this.mobile = info.mobile;      
    this.sex = info.sex;
    this.isLogin = true;
    //idcard/realname即使脱敏了也不应保存本地
    if (isSaveLocal) {
      AppStorage.SaveItem('lzloginuserInfo', info);
    }
    // this.updateheadportrait(info.photo, isthirdLogin);
  }

  public msgAlter(msg: string, toastCtrl,status: string) {
    let msgpop = toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: status
    });
    msgpop.present();   
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }
}
