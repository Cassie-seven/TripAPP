import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, Loading, LoadingController, ActionSheetController } from 'ionic-angular';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the FileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FileProvider {

  fileTransfer: TransferObject = this.transfer.create();
  loading: Loading;
  constructor(private transfer: Transfer, private alertCtrl:AlertController, 
  private loadingCtrl: LoadingController, private camera: Camera,
  private actionSheetCtrl: ActionSheetController) {
    
  }
  
  /**
   * 上传文件
   * @param fileUrl 文件路径
   * @param url 服务器地址
   * @param options 选项
   */
  public uploadByTransfer(fileUrl: string, url: string, options?: FileUploadOptions){
    if(!options){
      options = {
        fileKey: 'file',
        fileName: fileUrl.substr(fileUrl.lastIndexOf('/')+1)
      };
    }
   return this.fileTransfer.upload(fileUrl, url, options);
  }

  /**
   * 显示拍照选择
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
          text: '相册视频',
          role: 'destructive',
          handler: () => {
            options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
            this.getLocalImage(successCallback, errorCallback, options);
          }
        },
        {
          text: '录制视频',
          handler: () => {
            options.sourceType = this.camera.PictureSourceType.CAMERA
            this.getLocalImage(successCallback, errorCallback, options);
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
}
