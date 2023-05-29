import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';
import { AppLang } from '../../../app/app.lang';
import { UserFeedbackPage } from "../user-feedback/user-feedback";
/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  Lang = AppLang.Lang;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

  goBack () {
    this.viewCtrl.dismiss();
  }
  gotoFeedback () {
      // 界面跳转
      let modal = this.modalCtrl.create(UserFeedbackPage);
      modal.present();
  }
}
