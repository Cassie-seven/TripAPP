import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, AlertController,LoadingController,ToastController} from 'ionic-angular';

import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { CaseListApi } from '../../providers/caselist.api';
import {ApiConfig} from '../../app/api.config';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [CaseListApi]
})
export class AboutPage {
  case_id = "";
  avatar: string = "";
  url:any;
  avatarPath='./assets/imgs/logo.png';//默认图片
  data: string = "";
  imageBase64 : Array<string>=[];
  imageList : string [];
  public loading: any;
  datalist = [];
  uname = "";
  segmentsArray = [
    'segmentOne','segmentTwo','segmentThree','segmentFour'
  ];
  mapData = [
    {
      cssname: 'one',
      position: '深圳市上步中学'
    },
    {
      cssname: 'two',
      position: '深圳市八卦一路'
    },
    {
      cssname: 'three',
      position: '深圳市宝安农批市场公交站'
    }
  ]
  segmentModel: string = this.segmentsArray[0];
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera,public caselistApi: CaseListApi,
    public loadingCtrl: LoadingController,public toastCtrl: ToastController) {

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '上传图像',
      cssClass:'zm-action-button',
      buttons: [{
        text: '手机拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });

    actionSheet.present().then(value => {
      return value;
    });
  }

  goToDetails(data) {
    
  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then(image => {
      console.log('Image URI: ' + image);
      this.avatar = image.slice(7);
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
     this.data="";
    const options: ImagePickerOptions = {
      maximumImagesCount: 5,
      width: 200,
      height: 200
    };
    this.imagePicker.getPictures(options).then(images => {
      if (images.length > 5) {
        this.presentAlert();
        return;
      }
      for (var i = 0; i < images.length; i++) {
          // this.imageList.push(images[i].slice(7));
          var imgUrl = "<img src=" +images[i].slice(7) +" width=\"120px\" height=\"120px\">  ";
          this.data=this.data+imgUrl;
          
      }
      // this.avatar = images[0].slice(7);
      // if (images.length > 1) {
      //   this.presentAlert();
      // } else if (images.length === 1) {
      //   console.log('Image URI: ' + images[0]);
      //   this.avatar = images[0].slice(7);
      // }
    }, error => {
      alert('Error: ' + error);
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({title: "上传失败", message: "最多只能选择五张图片哦~~", buttons: ["确定"]});
    alert.present().then(value => {
      return value;
    });
  }
  getPicture(){
    this.data="";
    this.imageBase64=[];
    
    // options 里的具体内容请参照官网https://ionicframework.com/docs/native/image-picker/
    let options = {
      maximumImagesCount: 3,
      outputType: 1,
      quality: 100
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          // 保存图片到html控件
          var imgUrl = "<img src=" +results[i] +" width=\"60px\" height=\"60px\">  ";
          this.data=this.data+imgUrl;
          // 转64字节
          // this.base64.encodeFile(results[i]).then((base64File: string) => {
          // this.imageBase64.push(base64File);
          // }, (err) => {
          //   console.log(err);
          // });
      }
    }, (err) => { 
      alert("error");
    });
  }

  //下拉刷型界面
  refreshStart(refresher) {
    
  }

  async doRefresh(refresher) { 
    let that = this;
    let TIME_IN_MS = 100;
    setTimeout( () => {
      that.getData()
      refresher.complete();
    }, TIME_IN_MS);  
   
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

  async filterItems(ev: any) {
    this.case_id = ev.target.value;
    //加载数据列表
    let postData = { member_id : ApiConfig.RID,case_id: this.case_id };
    this.caselistApi.GetCaseRepayment(postData).then(result => {   
      if (result.code == 0 && result.data != null) {    
        this.datalist = result.data.list;      
      }
      else {
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout'); 
        return;
      }
    }).catch(err => {
      this.msgAlter("获取数据请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      return;
    });
  }

  async ionViewDidLoad() {  
    this.uname = window.localStorage.getItem('login_name');
    await this.getData()
  }

  async getData(){
    //加载数据列表
    let postData = { member_id : ApiConfig.RID,case_id: this.case_id };
    this.show();
    this.caselistApi.GetCaseRepayment(postData).then(result => {   
      if (result.code == 0 && result.data != null) {    
        this.datalist = result.data.list;  
        this.hide();      
      }
      else {
        this.hide();
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout'); 
        return;
      }
    }).catch(err => {
      this.msgAlter("获取数据请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });
  }
}
