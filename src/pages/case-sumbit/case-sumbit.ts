import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ActionSheetController,ViewController,ToastController,LoadingController,ModalController } from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { CaseListApi } from '../../providers/caselist.api';
import { HomePage } from '../../pages/home/home';
import {ApiConfig} from '../../app/api.config';
import {FileProvider} from '../../providers/FileProvider';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions,CaptureVideoOptions,CaptureAudioOptions  } from '@ionic-native/media-capture';
import { FileTransferObject,FileTransfer } from '@ionic-native/file-transfer';
import { jsonpFactory } from '@angular/http/src/http_module';
import { File } from '@ionic-native/file';
import {FileChooser} from '@ionic-native/file-chooser';
import {FilePath} from "@ionic-native/file-path";
import { Network } from '@ionic-native/network';
import { TabsPage } from '../tabs/tabs';
declare var BMap;

/**
 * Generated class for the CaseSumbitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-case-sumbit',
  templateUrl: 'case-sumbit.html',
  providers: [CaseListApi,FileProvider,MediaCapture,FileTransfer,FileTransferObject,File,FilePath,Network]
})
export class CaseSumbitPage {
  image_left: string = "";
  image_center: string = "";
  iamge_right: string = "";
  imageData1 = "assets/imgs/暂无照片.jpg";
  imageData2 = "assets/imgs/暂无照片.jpg";
  imageData3 = "assets/imgs/暂无照片.jpg";
  imageData4 = "assets/imgs/暂无照片.jpg";
  imageData5 = "assets/imgs/暂无照片.jpg";
  imageData6 = "assets/imgs/暂无照片.jpg";
  imageList = [];
  case_id = "";
  media = "";
  reminder = "";
  users = "";
  userFeedback = "";
  newClue ="";//新线索
  letter = "";//留函
  newAddress = "";//新地址
  newPhone = "";//新电话
  id = '';
  videoFilePath = "";
  mediaFilePath = "";
  mediaFilePath2 = "";
  voucherFilePath = "";
  public loading: any;

  mediaUploadString = "";
  mediaUploadString2 = "";
  videoUploadString = "";
  voucherUploadString = "";

  seclectedCountry = "";
  selectedTravelType = "";
  selectedLetterType = "";//信函结果
  selectedLetterValue = 0;//信函结果
  selectedRelationType = "";//
  selectedRelationValue = "";//
  //费用相关
  parking_fee = "";//停车费
  signatory = "";//私车签约人
  toll_fee = "";//过路费
  hotel_fee = "";//住宿费
  toll_fee_position = "";//过路费地点
  hotel_name = "";//住宿酒店名称
  //20210421新增字段
  car_number = "";//车牌号
  get_car_km = "";//领车公里数
  back_car_km = "";//还车公里数
  car_wash_money = "";//洗车费
  before_oil_balance = "";//加油前余额
  after_oil_balance = "";//加油后余额
  oil_amount = "";//加油费金额

  selectedValue = "";
  uname="";
  data:any;
  selectValue = "1";
  top = false;
  bottom = true;
  country= [
    {
      title: '联系转告',
      value:'redResult-third-LXZG'
    },
    {
      title: '承诺还款',
      value:'redResult-third-CLHK'
    },
    {
      title: '无力还款',
      value:'redResult-third-WLHK'
    },
    {
      title: '安排再访',
      value:'redResult-third-APZF'
    },
    {
      title: '地址无效',
      value:'redResult-third-DZWX'
    },
    {
      title: '不愿转告',
      value:'redResult-third-BYZG'
    }
  ];
  //出行方式
  travel_type = [
    {
      title: '公车',
      value:'1'
    },
    {
      title: '私车',
      value:'2'
    },
    {
      title: '乘车',
      value:'3'
    },
    {
      title: '步行',
      value:'4'
    }
  ];
  //信函结果
  letter_type = [
    {
      title: '无函件',
      value: 1
    },
    {
      title: '已送达',
      value: 2
    },
    {
      title: '已签收',
      value: 3
    },
    {
      title: '未送达',
      value: 4
    },
    {
      title: '退信',
      value: 5
    }
  ];
  // 0-本人 1-父母 2-亲戚 3-儿女 4-配偶 5-朋友 6-同事 7-邻居 8-其他 
  //信函结果
  relation_type = [
    {
      title: '本人',
      value: 'relationCard-BR'
    },
    {
      title: '父母',
      value: 'relationCard-FM'
    },
    {
      title: '亲属',
      value: 'relationCard-QS'
    },
    {
      title: '儿女',
      value: 'relationCard-ZN'
    },
    {
      title: '配偶',
      value: 'relationCard-PO'
    },
    {
      title: '朋友',
      value: 'relationCard-PY'
    },
    {
      title: '同事',
      value: 'relationCard-TS'
    },
    // {
    //   title: '邻居',
    //   value: 'relationCard-DSF'
    // },
    {
      title: '无法确定',
      value: 'relationCard-NUll'
    }
  ];

  fileTransfer: TransferObject = this.transfer.create();
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public imagePicker: ImagePicker,
    public viewCtrl: ViewController,
    public camera: Camera,
    public caselistApi: CaseListApi,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public fileProvider: FileProvider,
    private transfer: Transfer,
    private mediaCapture: MediaCapture,
    public ft: FileTransfer,
    private file: File,
    private fileChooser: FileChooser,
    public filePath:FilePath,
    private network: Network
    ) {
      this.case_id = this.navParams.get('case_id');
      this.id = this.navParams.get('id');
      this.data = this.navParams.get('data');
      console.log(this.data.bank_code);
  }

  save() {
    console.log(this.id);
    this.show('正在保存...');
    // window.localStorage.setItem('login_name',result.data.name);
    let effective_storage_name = this.id + '_effective';
    let result_storage_name = this.id + '_result';
    let vname_storage_name = this.id + '_vname';
    let reminder_storage_name = this.id + '_reminder';
    let newclue_storage_name = this.id + '_newclue';
    let letter_storage_name = this.id + '_letter';
    let newaddress_storage_name = this.id + '_newaddress';
    let newphone_storage_name = this.id + '_newphone';
    //费用
    let parking_fee_storage_name = this.id + '_parking_fee';
    let toll_fee_storage_name = this.id + '_toll_fee';
    let hotel_fee_storage_name = this.id + '_hotel_fee';
    let signatory_storage_name = this.id + '_signatory';
    //新增字段
    let car_number_storage_name = this.id + '_car_number';
    let get_car_km_storage_name = this.id + '_get_car_km';
    let back_car_km_storage_name = this.id + '_back_car_km';
    let car_wash_money_storage_name = this.id + '_car_wash_money';
    let before_oil_balance_storage_name = this.id + '_before_oil_balance';
    let after_oil_balance_storage_name = this.id + '_after_oil_balance';

    //保存到缓存
    window.localStorage.setItem(effective_storage_name,this.selectValue);
    window.localStorage.setItem(result_storage_name,this.seclectedCountry);
    window.localStorage.setItem(vname_storage_name,this.users == null ? '' : this.users);
    window.localStorage.setItem(reminder_storage_name,this.userFeedback == null ? '' : this.userFeedback);
    window.localStorage.setItem(newclue_storage_name,this.newClue == null ? '' : this.newClue);
    window.localStorage.setItem(letter_storage_name,this.letter == null ? '' : this.letter);
    window.localStorage.setItem(newaddress_storage_name,this.newAddress == null ? '' : this.newAddress);
    window.localStorage.setItem(newphone_storage_name,this.newPhone == null ? '' : this.newPhone);

    window.localStorage.setItem(parking_fee_storage_name,this.parking_fee == null ? '' : this.parking_fee);
    window.localStorage.setItem(toll_fee_storage_name,this.toll_fee == null ? '' : this.toll_fee);
    window.localStorage.setItem(hotel_fee_storage_name,this.hotel_fee == null ? '' : this.hotel_fee);
    window.localStorage.setItem(signatory_storage_name,this.signatory == null ? '' : this.signatory);

    window.localStorage.setItem(car_number_storage_name,this.car_number == null ? '' : this.car_number);
    window.localStorage.setItem(get_car_km_storage_name,this.get_car_km == null ? '' : this.get_car_km);
    window.localStorage.setItem(back_car_km_storage_name,this.back_car_km == null ? '' : this.back_car_km);
    window.localStorage.setItem(car_wash_money_storage_name,this.car_wash_money == null ? '' : this.car_wash_money);
    window.localStorage.setItem(before_oil_balance_storage_name,this.before_oil_balance == null ? '' : this.before_oil_balance);
    window.localStorage.setItem(after_oil_balance_storage_name,this.after_oil_balance == null ? '' : this.after_oil_balance);

    this.msgAlter("保存成功", this.toastCtrl, 'success');  
    this.hide();
  }

  ionViewDidLoad() {
    this.msgAlter("恢复至上次保存", this.toastCtrl, 'success');  
    this.uname = window.localStorage.getItem('login_name');

    let effective_storage_name = this.id + '_effective';
    let result_storage_name = this.id + '_result';
    let vname_storage_name = this.id + '_vname';
    let reminder_storage_name = this.id + '_reminder';
    let newclue_storage_name = this.id + '_newclue';
    let letter_storage_name = this.id + '_letter';
    let newaddress_storage_name = this.id + '_newaddress';
    let newphone_storage_name = this.id + '_newphone';

    let parking_fee_storage_name = this.id + '_parking_fee';
    let toll_fee_storage_name = this.id + '_toll_fee';
    let hotel_fee_storage_name = this.id + '_hotel_fee';
    let signatory_storage_name = this.id + '_signatory';

    //新增字段
    let car_number_storage_name = this.id + '_car_number';
    let get_car_km_storage_name = this.id + '_get_car_km';
    let back_car_km_storage_name = this.id + '_back_car_km';
    let car_wash_money_storage_name = this.id + '_car_wash_money';
    let before_oil_balance_storage_name = this.id + '_before_oil_balance';
    let after_oil_balance_storage_name = this.id + '_after_oil_balance';
   
    let temp = window.localStorage.getItem(effective_storage_name);
    if(temp == '1') {
      this.bottom = true;
      this.top = false;
    }
    if(temp == '0') {
      this.bottom = false;
      this.top = true;
    }
    this.seclectedCountry = window.localStorage.getItem(result_storage_name) == null ? '' : window.localStorage.getItem(result_storage_name);
    this.users = window.localStorage.getItem(vname_storage_name)== null ? '' : window.localStorage.getItem(vname_storage_name);
    this.userFeedback = window.localStorage.getItem(reminder_storage_name)== null ? '' : window.localStorage.getItem(reminder_storage_name);
    this.newClue = window.localStorage.getItem(newclue_storage_name)== null ? '' : window.localStorage.getItem(newclue_storage_name);
    this.letter = window.localStorage.getItem(letter_storage_name)== null ? '' : window.localStorage.getItem(letter_storage_name);
    this.newAddress = window.localStorage.getItem(newaddress_storage_name)== null ? '' : window.localStorage.getItem(newaddress_storage_name);
    this.newPhone = window.localStorage.getItem(newphone_storage_name)== null ? '' : window.localStorage.getItem(newphone_storage_name);

    this.parking_fee = window.localStorage.getItem(parking_fee_storage_name)== null ? '' : window.localStorage.getItem(parking_fee_storage_name);
    this.toll_fee = window.localStorage.getItem(toll_fee_storage_name)== null ? '' : window.localStorage.getItem(toll_fee_storage_name);
    this.hotel_fee = window.localStorage.getItem(hotel_fee_storage_name)== null ? '' : window.localStorage.getItem(hotel_fee_storage_name);
    this.signatory = window.localStorage.getItem(signatory_storage_name)== null ? '' : window.localStorage.getItem(signatory_storage_name);

    this.car_number = window.localStorage.getItem(car_number_storage_name)== null ? '' : window.localStorage.getItem(car_number_storage_name);
    this.get_car_km = window.localStorage.getItem(get_car_km_storage_name)== null ? '' : window.localStorage.getItem(get_car_km_storage_name);
    this.back_car_km = window.localStorage.getItem(back_car_km_storage_name)== null ? '' : window.localStorage.getItem(back_car_km_storage_name);
    this.car_wash_money = window.localStorage.getItem(car_wash_money_storage_name)== null ? '' : window.localStorage.getItem(car_wash_money_storage_name);
    this.before_oil_balance = window.localStorage.getItem(before_oil_balance_storage_name)== null ? '' : window.localStorage.getItem(before_oil_balance_storage_name);
    this.after_oil_balance = window.localStorage.getItem(after_oil_balance_storage_name)== null ? '' : window.localStorage.getItem(after_oil_balance_storage_name);
  }

  selectNumber(num) {
    this.seclectedCountry = num.title;
    this.selectedValue = num.value;
  }
  selectType(num) {
    this.selectedTravelType = num.title;
  }
  selectLetterType(num) {
    this.selectedLetterType = num.title;
    this.selectedLetterValue = num.value;
  }
  selectRelationType(num) {
    this.selectedRelationType = num.title;
    this.selectedRelationValue = num.value;
  }
  /**
   * 上传文件
   * @param fileUrl 文件路径
   * @param url 服务器地址
   * @param options 选项
   */
  public uploadByTransfer(fileUrl: string, url: string, options?: FileUploadOptions) {
    if(!options) {
      options = {
        fileKey: 'file',
        fileName: fileUrl.substr(fileUrl.lastIndexOf('/')+1),
        // chunkedMode: false,        
      };
    }
   return this.fileTransfer.upload(fileUrl, url, options);
  }

  /**
   * 视频选择
   */
  choosePhoto(successCallback, errorCallback, options?: CameraOptions) {
    if(!options){
      options = {
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          encodingType: this.camera.EncodingType.JPEG,
          saveToPhotoAlbum: true,
          mediaType: 1,   //0为图片，1为视频
          targetWidth: 400,
          targetHeight: 400
      };
    }
    let actionSheet = this.actionSheetCtrl.create({
      title: '上传视频',
      cssClass:'zm-action-button',
      buttons: [
        {
          text: '从文件选择',
          // role: 'destructive',
          handler: () => {
            // options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
            // this.getLocalImage(successCallback, errorCallback, options);
            // this.chooseVideoFile();
            this.chooseFile();
          }
        },
        {
          text: '录制视频',
          handler: () => {           
              let options: CaptureVideoOptions = {
                limit: 1,
                duration: 20,
              }
              this.mediaCapture.captureVideo(options).then((mediaFiles: MediaFile[]) => {
                var i, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {       
                  // alert("Record success! \n\n"
                  //   + "file name: " + mediaFiles[i].name + "\n\n"
                  //   + "size: " + (mediaFiles[i].size / 1024).toFixed(2) + "KB" + "\n\n"
                  //   + "fullPath: " + mediaFiles[i].fullPath + "\n\n"
                  //   + "lastModifiedDate: " + (mediaFiles[i].lastModifiedDate) + "\n\n"
                  //   + "type: " + mediaFiles[i].type + "\n\n");  
                  this.show("视频上传中...");            
                  let fileUrl = mediaFiles[i].fullPath.substr(mediaFiles[i].fullPath.indexOf('/')+2);            
                  this.uploadByTransfer(fileUrl,"http://202.105.104.178:8888/appapi/proxyapi/file?bank_name=" + this.data.bank_name).then(res => {
                    if(res == null) {
                      this.hide();
                      this.msgAlter("视频上传异常", this.toastCtrl,'error');
                      return; 
                    } 
                    var ret = JSON.parse(res.response)
                    this.videoFilePath = ret.data.uri[0];
                    if(this.videoFilePath == null || this.videoFilePath == ''){
                      this.msgAlter("视频路径为空", this.toastCtrl,'error');
                      this.hide();
                      return;
                    }   
                    this.videoUploadString = this.videoFilePath.substr(this.videoFilePath.lastIndexOf('/')+1);
                    this.hide();  
                    this.msgAlter("视频上传成功", this.toastCtrl,'success');  
                  })
                  .catch(err => {
                    this.hide();
                    this.msgAlter("视频上传请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
                  });
                }
              }, error => {
                alert("未获取到视频文件,请重试")
              });           
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    actionSheet.present();
  }

  chooseFile():Promise<any>{
    return new Promise((resolve, reject) => {
      this.fileChooser.open().then(uri =>{  // 手机上的绝对路径
        //截取最后六位
        let lastSIX = uri.substr(uri.length - 6);
        //判断文件是否还需要去解析  不同的机型获取的路径不一样 如美图一次性获取到 这里可能有问题
        //判断获取到的路径是不是绝对路径
        if(lastSIX.indexOf(".") != -1) {
          //是绝对路径 无需再去解析 直接上传
           this.uploadVideo(uri)       
        }
        else {
          //非绝对路径 需要解析获取绝对路径 再去上传
          this.resolveUri(uri).then(path=>{
            this.uploadVideo(path);
          })
        }   
      }).catch(e =>{
        reject(e);
      })
    })
  }
  chooseMediaFile(num):Promise<any>{
    return new Promise((resolve, reject) => {
      this.fileChooser.open().then(uri =>{  // 手机上的绝对路径
        //截取最后六位
        let lastSIX = uri.substr(uri.length - 6);
        //判断文件是否还需要去解析  不同的机型获取的路径不一样 如美图一次性获取到 这里可能有问题
        //判断获取到的路径是不是绝对路径
        if(lastSIX.indexOf(".") != -1) {
          //是绝对路径 无需再去解析 直接上传
           this.uploadMedia(uri,num)       
        }
        else {
          //非绝对路径 需要解析获取绝对路径 再去上传
          this.resolveUri(uri).then(path=>{
            this.uploadMedia(path,num);
          })
        }   
      }).catch(e =>{
        reject(e);
      })
    })
  }
  chooseVoucherFile():Promise<any>{   
    return new Promise((resolve, reject) => {
      this.fileChooser.open().then(uri =>{  // 手机上的绝对路径
        //截取最后六位
        let lastSIX = uri.substr(uri.length - 6);
        //判断文件是否还需要去解析  不同的机型获取的路径不一样 如美图一次性获取到 这里可能有问题
        //判断获取到的路径是不是绝对路径
        if(lastSIX.indexOf(".") != -1) {
          //是绝对路径 无需再去解析 直接上传
           this.uploadVoucher(uri)       
        }
        else {
          //非绝对路径 需要解析获取绝对路径 再去上传
          this.resolveUri(uri).then(path=>{
            this.uploadVoucher(path);
          })
        }   
      }).catch(e =>{
        reject(e);
      })
    })
  }

  //解析路径
  resolveUri(uri:string):Promise<any>{
    return new Promise((resolve, reject) => {
      this.filePath.resolveNativePath(uri).then(filePath =>{
        resolve(filePath);
      }).catch(err =>{
        alert("解析路径失败");
        reject(err);
      });
    })  
  }

  uploadVideo(fileUrl) {
    if(fileUrl =='' || fileUrl == null) {
      alert('选择文件路径为空')
      return;
    }
    
    let exd = fileUrl.substr(fileUrl.lastIndexOf('.')+1).toLocaleLowerCase()
    //如果length大于10  说明此路径不能上传
    if(exd.length > 10) return;
    if(
        exd != 'avi' &&
        exd != 'mp4' &&
        exd != 'mov' &&
        exd != 'rmvb' &&
        exd != 'flv' &&
        exd != '3gp' 
    ){
      alert('上传的视频文件格式不正确')
      return;
    }
    let loading = this.loadingCtrl.create({
      content: '视频上传进度： 0%',
      dismissOnPageChange: false
    })
    loading.present();
  
    let now: number = 0;
    this.fileTransfer.onProgress(progressEvent => {
        if(progressEvent.lengthComputable) {
          now = progressEvent.loaded / progressEvent.total * 100;
        }
    });
    let timer = setInterval (()=>{
        loading.setContent("视频上传进度：" + Math.floor(now) + "%");
        if(now >= 99) {
          clearInterval(timer);
        }
    },300);
    this.uploadByTransfer(fileUrl,"http://202.105.104.178:8888/appapi/proxyapi/file?bank_name=" + this.data.bank_name).then(res => {
      if(res == null) {
        loading.dismiss();
        this.msgAlter("视频上传失败", this.toastCtrl,'error');
        return;
      }
      var ret = JSON.parse(res.response)
      this.videoFilePath = ret.data.uri[0];
      if(this.videoFilePath == null || this.videoFilePath == ''){
        this.msgAlter("视频路径为空", this.toastCtrl,'error');
        loading.dismiss();
        return;
      }   
      this.videoUploadString = this.videoFilePath.substr(this.videoFilePath.lastIndexOf('/')+1);
      if(timer) {
        clearInterval(timer);
        loading.dismiss();
      }  
      this.msgAlter("视频上传成功", this.toastCtrl,'success');  
    })
    .catch(err => {
      loading.dismiss();
      this.msgAlter("视频上传请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
    });
  }
  uploadVoucher(fileUrl){
    let that = this;
    if(fileUrl =='' || fileUrl == null) {
      alert('选择文件路径为空')
      return;
    }
    let loading = this.loadingCtrl.create({
      content: '凭证上传进度： 0%',
      dismissOnPageChange: false
    })
    loading.present();
  
    let now: number = 0;
    this.fileTransfer.onProgress(progressEvent => {
        if(progressEvent.lengthComputable) {
          now = progressEvent.loaded / progressEvent.total * 100;
        }
    });
    let timer = setInterval (()=>{
        loading.setContent("凭证上传进度：" + Math.floor(now) + "%");
        if(now >= 99) {
          clearInterval(timer);
        }
    },300);
    that.uploadByTransfer(fileUrl,"http://202.105.104.178:8888/appapi/proxyapi/file?bank_name=" + this.data.bank_name).then(res => {
      if(res == null) {
        loading.dismiss();
        that.msgAlter("凭证上传失败", that.toastCtrl,'error');
        return;
      }
      var ret = JSON.parse(res.response)
      that.voucherFilePath = ret.data.uri[0];
      if(that.voucherFilePath == null || that.voucherFilePath == ''){
        that.msgAlter("凭证路径为空", that.toastCtrl,'error');
        loading.dismiss();
        return;
      }   
      if(timer) {
        clearInterval(timer);
        loading.dismiss();
      }   
      that.voucherUploadString = that.voucherFilePath.substr(that.voucherFilePath.lastIndexOf('/')+1); 
      that.msgAlter("凭证上传成功", that.toastCtrl,'success');  
    })
    .catch(err => {
      loading.dismiss();
      that.msgAlter("凭证上传请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
    });
  }
  async uploadMedia(fileUrl,num) {
    let that = this;
    if(fileUrl =='' || fileUrl == null) {
      alert('选择文件路径为空')
      return;
    }    
  //   let exd = fileUrl.substr(fileUrl.lastIndexOf('.')+1).toLocaleLowerCase()
  //   if(exd.length > 10) return;
  //   if(
  //     exd != 'aac' &&
  //     exd != 'mp3' &&
  //     exd != 'cda' &&
  //     exd != 'wav' &&
  //     exd != 'wma' &&
  //     exd != 'ra' &&
  //     exd != 'midi' &&
  //     exd != 'ogg' &&
  //     exd != 'ape' &&
  //     exd != 'flac' &&
  //     exd != 'm4a' &&
  //     exd != 'amr' &&
  //     exd != '3gpp'
  // ){
  //   alert('上传的录音文件格式不正确')
  //   return;
  // }
  // that.show("录音上传中...");

  let loading = this.loadingCtrl.create({
    content: '录音上传进度： 0%',
    dismissOnPageChange: false
  })
  loading.present();

  let now: number = 0;
  this.fileTransfer.onProgress(progressEvent => {
      if(progressEvent.lengthComputable) {
        now = progressEvent.loaded / progressEvent.total * 100;
      }
  });
  let timer = setInterval (()=>{
      loading.setContent("录音上传进度：" + Math.floor(now) + "%");
      if(now >= 99) {
        clearInterval(timer);
      }
  },300);
  that.uploadByTransfer(fileUrl,"http://202.105.104.178:8888/appapi/proxyapi/file?bank_name=" + this.data.bank_name).then(res => {    
      var ret = JSON.parse(res.response)
      
      if(ret.code != 0){
        loading.dismiss();
        that.msgAlter("录音上传失败", that.toastCtrl,'error');
        return;
      }
      if(num == 1) {
        that.mediaFilePath = ret.data.uri[0];
      }
      if(num == 2) {
        that.mediaFilePath2 = ret.data.uri[0];
      }
     
      if(that.mediaFilePath == null || that.mediaFilePath == ''){
        that.msgAlter("录音路径为空", that.toastCtrl,'error');
        loading.dismiss();
        return;
      }   
      that.hide(); 
      if(num == 1) {
        that.mediaUploadString = that.mediaFilePath.substr(that.mediaFilePath.lastIndexOf('/')+1);
      }
      if(num == 2) {
        that.mediaUploadString2 = that.mediaFilePath2.substr(that.mediaFilePath2.lastIndexOf('/')+1);
      }
       if(timer) {
         clearInterval(timer);
         loading.dismiss();
       } 
      that.msgAlter("录音上传成功", that.toastCtrl,'success');
    })
    .catch(err => {
      alert(err);
      that.msgAlter("录音上传请求异常 请检查网络设置或联系管理员", that.toastCtrl,'error');
      loading.dismiss();
    });
  }
  /**
   * Default is CAMERA. PHOTOLIBRARY : 0, CAMERA : 1, SAVEDPHOTOALBUM : 2
   */
  getLocalImage(successCallback, errorCallback, options: CameraOptions){
    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      successCallback(imageData);
    }, err => {
      // Handle error
      errorCallback(err);
    });   
  }

  goBack() {
    this.viewCtrl.dismiss();  
  }

  

  presentActionSheet(num) {
    if(this.network.type == 'none'){
      this.msgAlter("当前无网络，请检查网络连接", this.toastCtrl,'error'); 
      return;
    }
    let actionSheet = this.actionSheetCtrl.create({
      title: '上传图像',
      cssClass:'zm-action-button',
      buttons: [{
        text: '手机拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto(num);
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum(num);
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

  takePhoto(num) {
    let that = this;
    const options: CameraOptions = {
      // allowEdit: true,
      // targetWidth: 200,
      // targetHeight: 200,
      // saveToPhotoAlbum: true,
      quality: 100,
      // targetWidth: 720,
      // targetHeight: 720,
      // allowEdit: true,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG
    };

    this.camera.getPicture(options).then(image => {
      console.log('Image URI: ' + image);
      that.show("图片上传中...");
      let postData = { imageData: image,bank_name:this.data.bank_name };
      that.caselistApi.UploadImage(postData).then(result => {   
          if (result.code == 0) {  
            if(num == 1){
              that.imageData1 = "data:image/jpeg;base64," + image;   
              that.imageList.push(result.data)       
            }
            if(num == 2){
              that.imageData2 = "data:image/jpeg;base64," + image;
              that.imageList.push(result.data)
            }
            if(num == 3){
              that.imageData3 = "data:image/jpeg;base64," + image;
              that.imageList.push(result.data)
            }
            if(num == 4){
              that.imageData4 = "data:image/jpeg;base64," + image;
              that.imageList.push(result.data)
            }
            if(num == 5){
              that.imageData5 = "data:image/jpeg;base64," + image;
              that.imageList.push(result.data)
            }  
            if(num == 6){
              that.imageData6 = "data:image/jpeg;base64," + image;
              that.imageList.push(result.data)
            } 
            that.hide();                
          }
          else {   
            that.hide();              
            return;
          }
        }).catch(err => {
          this.msgAlter("图片上传请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
          that.hide();      
          return;
        });
    }, error => {
      console.log('Error: ' + error);
    });
  }

  langSelect() {
    console.log("langSelect: "+ this.selectValue);
  }

  chooseFromAlbum(num) {   
    let that = this;
    let options: CameraOptions = {
      quality: 100,
      // targetWidth: 1024,
      // targetHeight: 1024,
      // allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
  }  
  this.camera.getPicture(options).then(imageData => {
    that.show("图片上传中...");
    let postData = { imageData: imageData,bank_name: this.data.bank_name };
    this.caselistApi.UploadImage(postData).then(result => {   
      if (result.code == 0) {  
        if(num == 1){
          that.imageData1 = "data:image/jpeg;base64," + imageData;
          this.imageList.push(result.data)
        }
        if(num == 2){
          that.imageData2 = "data:image/jpeg;base64," + imageData;
          this.imageList.push(result.data)
        }
        if(num == 3){
          that.imageData3 = "data:image/jpeg;base64," + imageData;
          this.imageList.push(result.data)
        } 
        if(num == 4){
          that.imageData4 = "data:image/jpeg;base64," + imageData;
          that.imageList.push(result.data)
        }
        if(num == 5){
          that.imageData5 = "data:image/jpeg;base64," + imageData;
          that.imageList.push(result.data)
        }
        if(num == 6){
          that.imageData6 = "data:image/jpeg;base64," + imageData;
          that.imageList.push(result.data)
        }  
        that.hide();              
      }
      else {
        that.hide();           
        return;
      }
    });
  }).catch(err => {
    this.msgAlter("图片上传请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
    that.hide();
    return;
  });
  }
  uploadvideo() {
    if(this.network.type == 'none'){
      this.msgAlter("当前无网络，请检查网络连接", this.toastCtrl,'error'); 
      return;
    }
    this.choosePhoto(res=>{
      this.show('视频上传中...');
      this.uploadByTransfer(res, 'http://202.105.104.178:8888/appapi/proxyapi/file?bank_name=' + this.data.bank_name)
      .then(res => {
        if(res == null) {
          this.hide();
          this.msgAlter("视频上传异常", this.toastCtrl,'error');
          return;
        }
        var ret = JSON.parse(res.response)
        this.videoFilePath = ret.data.uri[0];
        if(this.videoFilePath == null || this.videoFilePath == ''){
          this.msgAlter("视频路径为空", this.toastCtrl,'error');
          this.hide();
          return;
        }   
        this.hide();    
      })
      .catch(err => {
        this.hide();
        this.msgAlter("视频上传请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
        console.log(err);
      });
    },err=>{
      this.hide();
      console.log(err);
    });
    this.hide();
  }
  
  takeMedia(num) {
    let options: CaptureAudioOptions = { limit: 1, duration: 10 };
    let that = this;
    this.mediaCapture.captureAudio(options).then(									
      function (mediaFiles: MediaFile[]) { 
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {       
          // alert("Record success! \n\n"
          //   + "file name: " + mediaFiles[i].name + "\n\n"
          //   + "size: " + (mediaFiles[i].size / 1024).toFixed(2) + "KB" + "\n\n"
          //   + "fullPath: " + mediaFiles[i].fullPath + "\n\n"
          //   + "lastModifiedDate: " + (mediaFiles[i].lastModifiedDate) + "\n\n"
          //   + "type: " + mediaFiles[i].type + "\n\n");    
          
          let fileUrl = mediaFiles[i].fullPath;     
          that.show("录音上传中...");                   
          that.uploadByTransfer(fileUrl,"http://202.105.104.178:8888/appapi/proxyapi/file?bank_name=" + this.data.bank_name).then(res => {
            if(res == null) {
              that.hide();
              that.msgAlter("上传录音失败", that.toastCtrl,'error');
              return;
            }
            var ret = JSON.parse(res.response)
            that.mediaFilePath = ret.data.uri[0];
            if(that.mediaFilePath == null || that.mediaFilePath == ''){
              that.msgAlter("录音路径为空", that.toastCtrl,'error');
              that.hide();
              return;
            }  
            that.mediaUploadString = that.mediaFilePath.substr(that.mediaFilePath.lastIndexOf('/')+1); 
            that.msgAlter("上传录音成功", that.toastCtrl,'success');
            that.hide();    
          })
          .catch(err => {
            that.msgAlter("上传录音异常 请检查网络设置或联系管理员", that.toastCtrl,'error');
            that.hide();
            console.log(err);
            return;
          });
        }
      },									
      function (err: CaptureError) { 
        alert('未获取到录音文件,请重试');
      }									
    );
  }
  chooseFromFile() {
    let that = this;
    this.fileChooser.open()
    .then(
      uri => {
        alert(uri)
        let exd = uri.substr(uri.lastIndexOf('.')+1).toLocaleLowerCase()
        // if(
        //     exd != 'aac' &&
        //     exd != 'mp3' &&
        //     exd != 'cda' &&
        //     exd != 'wav' &&
        //     exd != 'wma' &&
        //     exd != 'ra' &&
        //     exd != 'midi' &&
        //     exd != 'ogg' &&
        //     exd != 'ape' &&
        //     exd != 'flac' 
        // ){
        //   alert('上传的录音文件格式不正确')
        //   return;
        // }
        that.show("录音上传中...");
        that.uploadByTransfer(uri,"http://202.105.104.178:8888/appapi/proxyapi/file?bank_name=" + this.data.bank_name).then(res => {
          if(res == null) {
            that.hide();
            that.msgAlter("录音上传失败", that.toastCtrl,'error');
            return;
          }
          var ret = JSON.parse(res.response)
          that.mediaFilePath = ret.data.uri[0];  
          if(that.mediaFilePath == null || that.mediaFilePath == ''){
            that.msgAlter("录音路径为空", that.toastCtrl,'error');
            that.hide();
            return;
          }   
          that.msgAlter("录音上传成功", that.toastCtrl,'success');
          that.hide();    
        })
        .catch(err => {
          that.msgAlter("录音上传异常 请检查网络设置或联系管理员", that.toastCtrl,'error');
          that.hide();
          console.log(err);
          return;
        });
       }
          
    )
    .catch(e => alert(e));
  }
  chooseVideoFile() {
    let that = this;
    this.fileChooser.open()
    .then(
      uri => {
        if(uri =='' || uri == null) {
          alert('选择文件路径为空')
          return;
        }
        
        let exd = uri.substr(uri.lastIndexOf('.')+1).toLocaleLowerCase()
        if(
            exd != 'avi' &&
            exd != 'mp4' &&
            exd != 'mov' &&
            exd != 'rmvb' &&
            exd != 'flv' &&
            exd != '3gp'
        ){
          alert('上传的视频文件格式不正确')
          return;
        }
        that.show("视频上传中...");
        that.uploadByTransfer(uri,"http://202.105.104.178:8888/appapi/proxyapi/file?bank_name=" + this.data.bank_name).then(res => {
          if(res == null) {
            that.hide();
            that.msgAlter("视频上传失败", that.toastCtrl,'error');
            return;
          }
          var ret = JSON.parse(res.response)
          that.videoFilePath = ret.data.uri[0];
          if(that.videoFilePath == null || that.videoFilePath == ''){
            that.msgAlter("视频路径为空", that.toastCtrl,'error');
            that.hide();
            return;
          }   
          that.msgAlter("视频上传成功", that.toastCtrl,'success');
          that.hide();    
        })
        .catch(err => {
          that.msgAlter("视频上传异常 请检查网络设置或联系管理员", that.toastCtrl,'error');
          that.hide();
          console.log(err);
          return;
        });
       }
          
    )
    .catch(e => alert(e));
  }
  uploadmedia(num) {
    if(this.network.type == 'none') {
      this.msgAlter("当前无网络，请检查网络连接", this.toastCtrl,'error'); 
      return;
    }
    let actionSheet = this.actionSheetCtrl.create({
      title: '上传录音',
      cssClass:'zm-action-button',
      buttons: [{
        text: '录制',
        role: 'takePhoto',
        handler: () => {
          this.takeMedia(num);
        }
      }, {
        text: '从文件选择',
        role: 'chooseFromFile',
        handler: () => {
          this.chooseMediaFile(num);
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
  cancelSelect() {
    console.log('点了取消')
  }
  cancelRelationSelect() {
    this.selectedRelationValue = '';
  }
  //上传凭证
  uploadvoucher(){
    if(this.network.type == 'none') {
      this.msgAlter("当前无网络，请检查网络连接", this.toastCtrl,'error'); 
      return;
    }
    this.chooseVoucherFile();
  }


  sumbit() {
    if(this.seclectedCountry == '联系转告') {
        this.selectedValue = 'redResult-third-LXZG'
    }
    if(this.seclectedCountry == '承诺还款') {
      this.selectedValue = 'redResult-third-CLHK'
    }
    if(this.seclectedCountry == '无力还款') {
      this.selectedValue = 'redResult-third-WLHK'
    }
    if(this.seclectedCountry == '安排再访') {
      this.selectedValue = 'redResult-third-APZF'
    }
    if(this.seclectedCountry == '地址无效') {
      this.selectedValue = 'redResult-third-DZWX'
    }
    if(this.seclectedCountry == '不愿转告') {
      this.selectedValue = 'redResult-third-BYZG'
    }
    
    let that = this;
    if(this.network.type == 'none'){
      this.msgAlter("当前无网络，请检查网络连接", this.toastCtrl,'error'); 
      return;
    }
    if(this.seclectedCountry == ''){
      this.msgAlter("请选择催收结果", this.toastCtrl,'error');
      return;
    }
    if(this.selectedRelationValue == ''){
      this.msgAlter("请选择受访人关系", this.toastCtrl,'error');
      return;
    }
    if(this.selectedTravelType == ''){
      this.msgAlter("请选择出行方式", this.toastCtrl,'error');
      return;
    } 
    if(this.data.bank_code == 'SPDBank') {
      if(this.selectedLetterValue == 0){
        this.msgAlter("请选择信函情况", this.toastCtrl,'error');
        return;
      }
    }
    if(this.users == ''){
      this.msgAlter("请填写外访人员", this.toastCtrl,'error');
      return;
    }
    if(this.userFeedback == '' ) {
      this.msgAlter("请填写催记记录", this.toastCtrl,'error');
      return;
    }
    //测试注释 及时恢复！！！！
    if(this.mediaFilePath == '') {
      this.msgAlter("请上传录音文件", this.toastCtrl,'error');
      return;
    }
    if(this.imageList.length < 3) {
      this.msgAlter("请上传至少三张图片", this.toastCtrl,'error');
      return;
    }
    if(this.seclectedCountry == '承诺还款'){
      if(this.voucherUploadString == ''){
        this.msgAlter("承诺还款，请上传还款凭证", this.toastCtrl,'error');
        return;
      }
    }  

    let medias = ''; 
    if(this.mediaFilePath2 != '') {
      medias = this.mediaFilePath + ',' + this.mediaFilePath2;
    } 
    else {
      medias = this.mediaFilePath;
    }
   
    let postData = { 
      case_id : this.case_id,
      image: this.imageList,
      media: medias,
      video: this.videoFilePath,
      voucher: this.voucherFilePath,
      reminder: this.userFeedback + '。外访人员:' + this.users,
      result: this.seclectedCountry,
      travel_type: this.selectedTravelType,
      selectedLetterValue: this.selectedLetterValue,//信函情况
      relationCard: this.selectedRelationValue,//被访人对应关系
      id: this.id,
      vis_user: this.users,//外访人员
      is_effective: this.selectValue//是否有效户
    };
    let postData2 = { 
      case_id: this.case_id,
      status: 'C',
      id: this.id, 
      member_id : ApiConfig.RID,
      adress_id:this.data.address_id
    }; 
    let letter_content = '';
    if(this.selectedLetterValue==1) {
      letter_content = '';
    }
    if(this.selectedLetterValue==2) {
      letter_content = '(携带该客户催告函，已送达)';
    }
    if(this.selectedLetterValue==3) {
      letter_content = '(携带该客户催告函，已签收)';
    }
    if(this.selectedLetterValue==4) {
      letter_content = '(携带该客户催告函，未送达)';
    }
    if(this.selectedLetterValue==5) {
      letter_content = '(携带该客户催告函，退信)';
    }
    if(this.data.bank_code != 'SPDBank') {      
      letter_content = '';
    }
    let postData3 = {
      pr_case_id: this.case_id,
      pr_content:this.userFeedback + '。' + letter_content + '外访人员:' + this.users,
      result: this.selectedValue,
      pr_name:'',
      pr_user_id:ApiConfig.RID,
      new_clue:this.newClue,
      letter:this.letter,
      address:this.newAddress,
      phone:this.newPhone,
      id: this.id,
      signatory: this.signatory,
      toll_fee: this.toll_fee,
      parking_fee: this.parking_fee,
      hotel_fee: this.hotel_fee,
      bank_code: this.data.bank_code,
      car_number: this.car_number,
      get_car_km: this.get_car_km,
      back_car_km: this.back_car_km,
      car_wash_money: this.car_wash_money,
      before_oil_balance: this.before_oil_balance,
      after_oil_balance: this.after_oil_balance,
      relationCard: this.selectedRelationValue//被访人对应关系
    };
    this.show();
    this.caselistApi.UpdateMemberCaseData(postData).then(result => {    
      if (result.code == 0) {  
        this.caselistApi.updatecasestatus(postData2).then(result => {   
          if (result.code == 0) {  
            this.caselistApi.AddReminder(postData3).then(result => {  
              if (result.code == 0) {  
                this.msgAlter("提交成功,页面即将跳转至首页~~", this.toastCtrl,'success');  
                //记住当前的私车签约人 可能变动不是很大
                let signatory_storage_name = this.id + '_signatory';
                window.localStorage.setItem(signatory_storage_name,this.signatory == null ? '' : this.signatory);
                this.clearLocalStoage();                   
                setTimeout( () => {
                  that.viewCtrl.dismiss(); 
                  let modal = that.modalCtrl.create(TabsPage);
                  modal.present();
                }, 3000);  
                return;               
              }
              else {  
                this.msgAlter("插入催记失败请联系管理员~~", this.toastCtrl,'error');     
                this.hide();     
                return;
              }
              // this.msgAlter("提交失败", this.toastCtrl,'error');
              // this.hide();      
             });                      
          }
          if(result.code == 1) {  
            this.msgAlter("修改案件状态失败，请联系管理员~~", this.toastCtrl,'error');     
            this.hide();     
            return;
          }
        });
      }
      else {  
        this.msgAlter("提交失败", this.toastCtrl,'error');    
        this.hide();      
        return;
      }
    }).catch(err => {
      this.msgAlter("提交催记请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      this.hide();
      return;
    });
  }
  show(content = '外访数据提交中..') {
    this.loading = this.loadingCtrl.create({
      content: content
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
      duration: 3000,
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
  //清理缓存
  clearLocalStoage() {
    let effective_storage_name = this.id + '_effective';
    let result_storage_name = this.id + '_result';
    let vname_storage_name = this.id + '_vname';
    let reminder_storage_name = this.id + '_reminder';
    let newclue_storage_name = this.id + '_newclue';
    let letter_storage_name = this.id + '_letter';
    let newaddress_storage_name = this.id + '_newaddress';
    let newphone_storage_name = this.id + '_newphone';
    let parking_fee_storage_name = this.id + '_parking_fee';
    let toll_fee_storage_name = this.id + '_toll_fee';
    let hotel_fee_storage_name = this.id + '_hotel_fee';
    // let signatory_storage_name = this.id + '_signatory';
                
    window.localStorage.removeItem(effective_storage_name);
    window.localStorage.removeItem(result_storage_name);
    window.localStorage.removeItem(vname_storage_name);
    window.localStorage.removeItem(reminder_storage_name);
    window.localStorage.removeItem(newclue_storage_name);
    window.localStorage.removeItem(letter_storage_name);
    window.localStorage.removeItem(newaddress_storage_name);
    window.localStorage.removeItem(newphone_storage_name);

    window.localStorage.removeItem(parking_fee_storage_name);
    window.localStorage.removeItem(toll_fee_storage_name);
    window.localStorage.removeItem(hotel_fee_storage_name);
    // window.localStorage.removeItem(signatory_storage_name);
  }
}
