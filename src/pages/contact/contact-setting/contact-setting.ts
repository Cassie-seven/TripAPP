import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController,AlertController,MenuController,App,Platform } from 'ionic-angular';
import { LoginPage } from "../../login/login";

/**
 * Generated class for the ContactSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-setting',
  templateUrl: 'contact-setting.html',
})
export class ContactSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    public modalCtrl:ModalController,
    public alertCtrl:AlertController,
    public menuCtrl:MenuController,
    public app:App,
    private platform: Platform  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactSettingPage');
  }

  goBack() {
    this.viewCtrl.dismiss();
  }

  logout() {
    let that = this;
    let alert = this.alertCtrl.create({
      title: '提示',
      message: '您确定要退出程序吗?',
      cssClass: 'alertBtn',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: '确定',
          handler: () => {
            setTimeout(() => {
              // that.navCtrl.push(LoginPage);
              this.platform.exitApp();
            }, 500) 
          }
        }
      ]
    });
    alert.present();
  }
}
