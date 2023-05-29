import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ModalController,LoadingController,ToastController,Platform  } from 'ionic-angular';
import { CaseSumbitPage } from "../case-sumbit/case-sumbit";
import { CaseListApi } from '../../providers/caselist.api';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
declare const baidu_location: any
declare var BMap;

/**
 * Generated class for the CaseProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-case-process',
  templateUrl: 'case-process.html',
  providers: [CaseListApi,Network]
})
export class CaseProcessPage {
  data:any = [
    {name:'第一步', birthYear:'打卡', gender:1, description:'在出发地打卡',icon:'assets/imgs/位置.png'},
    {name:'第二部', birthYear:'打卡', gender:0, description:'到达目标地打卡',icon:'assets/imgs/位置.png'},
    {name:'第三步', birthYear:'上传', gender:0, description:'上传外访资料，如催记、照片等',icon:'assets/imgs/上传.png'}
]; 
gpslnt: any;//GPS经度
  gpslat: any;//GPS纬度
  gLng: any;//gcj-02 经度
  gLat: any;//gcj-02 纬度
  bLng: any;//BD-09  经度
  bLat: any;//gcj-02 纬度
  PI = Math.PI;
  xPI = Math.PI * 3000.0 / 180.0;
case_id = '';//案件ID
datalist = [];// 接收数据
process = '';//当前进度
start_position = "";
end_position = "";
id = "";
member_case_id = "";
start_flag = false;//起点打卡动作是否成功
uname="";
datas = [];
public loading: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController, 
    public caselistApi: CaseListApi,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private network: Network,
    private geolocation: Geolocation,
    private platform: Platform
    ) {
      this.case_id = this.navParams.get('case_id');
      this.member_case_id = this.navParams.get('id');
      this.datas = this.navParams.get('data');
      console.log(this.datas)
      this.getCaseProcess()  
  }

  ionViewDidLoad() {   
    console.log('ionViewDidLoad CaseProcessPage');
    this.uname = window.localStorage.getItem('login_name');
  }

  async getCaseProcess(){
    let postData = { id: this.member_case_id };
    this.show();
    this.caselistApi.getcaseprocess(postData).then(result => {   
      if (result.code == 0) {   
        this.datalist = result.data;
        this.process = result.data.process;
        this.end_position = result.data.end_position;
        this.start_position = result.data.start_position;
        this.id = result.data.id;
        this.hide();      
      }
      else {
        this.hide();
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      this.msgAlter("获取案件进度请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });;
  }
  public msgAlter(msg: string, toastCtrl,status: string) {
    let msgpop = toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: status
    });
    msgpop.present();   
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

  goBack() {
    this.viewCtrl.dismiss();  
  }

  async _startInterview(name) {
    let that = this;
    if(this.process > name) {
      this.msgAlter("当前步骤已完成,不能重复操作", this.toastCtrl,'loginout');
      return;
    }
    if(this.process < name) {
      this.msgAlter("请先完成上一步", this.toastCtrl,'loginout');
      return;
    }
    if(name != "3") {
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
              
              await that.getarea(name);  
            }
          }
        ]
      });
      confirm.present();
    }             
    else {
      //跳转至信息提交页面
      let modal = this.modalCtrl.create(CaseSumbitPage,{case_id:this.case_id,id:this.member_case_id,data:this.datas});
      modal.present();
    }
  }

  async getarea(name){ 
    let that = this;
    if (typeof baidu_location === "undefined") {
      alert("baidumap_location is undefined"); 
      return; 
    }; 
    baidu_location.getCurrentPosition(function (result) {
      that.myaddr(result.longitude,result.latitude,name);     
    }, function (error) { 
      alert(error); 
      return;
    });
  }

  async UpdateMemberCaseStartPostion(postData,addrmsg,lontitude,latitude) {   
    let that = this;
    this.show();
    this.caselistApi.UpdateMemberCaseStartPostion(postData).then(result => {   
      if (result.code == 0) {           
        this.hide();
        this.viewCtrl.dismiss();  
        let modal = this.modalCtrl.create(CaseProcessPage,{case_id:this.case_id,id:this.member_case_id,data:this.datas});
        modal.present();  
        setTimeout( () => {
          that.showPositionInfo(addrmsg)   
        }, 1000);  
           
      }
      else {
        this.hide();
        this.msgAlter("数据更新失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      alert(err);
      this.msgAlter("获取案件起始位置请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });
  }

  async UpdateMemberCaseEndPostion(postData,addrmsg,lontitude,latitude) {  
    let that = this; 
    this.show();
    this.caselistApi.UpdateMemberCaseEndPostion(postData).then(result => {   
      if (result.code == 0) { 
        this.hide();
        this.viewCtrl.dismiss();  
        let modal = this.modalCtrl.create(CaseProcessPage,{case_id:this.case_id,id:this.member_case_id,data:this.datas});
        modal.present();  
        setTimeout( () => {
          that.showPositionInfo(addrmsg)   
        }, 1000);       
      }
      else {
        this.hide();
        this.msgAlter("数据更新失败", this.toastCtrl,'loginout');
        return;
      }
    }).catch(err => {
      this.msgAlter("获取案件目的位置请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });
  }
  
  myaddr(lontitude,latitude,name){    
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
      if(name == '1'){
        let postData = { 
          case_id: that.case_id,
          start_position: addrmsg,
          lontitude:lontitude,
          latitude:latitude,
          id:that.member_case_id
        };   
        that.UpdateMemberCaseStartPostion(postData,addrmsg,lontitude,latitude)          
      }
      if(name == '2'){
        let postData = { 
          case_id: that.case_id,
          end_position: addrmsg,
          lontitude:lontitude,
          latitude:latitude,
          id:that.member_case_id
        };   
        that.UpdateMemberCaseEndPostion(postData,addrmsg,lontitude,latitude)    
      }
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

  getGps() {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then(pos => {      
        this.gpslnt = pos.coords.longitude;
        this.gpslat = pos.coords.latitude;
        this.gcj_encrypt(this.gpslnt,this.gpslat);
      }).catch((error) => {
        alert('当前位置GPS定位信号弱或未打开GPS');
      });     
    });
  }
  
  async gcj_encrypt(lng,lat){
      var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
      var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
      var dLat = await this.transformLat(lng - 105.0, lat - 35.0);
      var dLng = await this.transformLng(lng - 105.0, lat - 35.0);
      var radLat = lat / 180.0 * this.PI;
      var magic = Math.sin(radLat);
      magic = 1 - ee * magic * magic;
      var sqrtMagic = Math.sqrt(magic);
      var Tlat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
      var Tlng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
      var gLng = Tlng + lng;
      var gLat = Tlat + lat;
      await this.bd_encrypt(gLng,gLat);
  }

  async bd_encrypt(gLng,gLat){
      var x = gLng;
      var y = gLat;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sign(y * this.xPI);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.xPI);
      this.bLng = z * Math.cos(theta) + 0.0065;
      this.bLat = z * Math.sin(theta) + 0.006;
      alert(this.bLng+','+this.bLat);
  }

  async transformLat(x,y){
      var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
      return ret;
  }

  async transformLng(x,y){
      var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
      ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
      return ret;
  }
}
