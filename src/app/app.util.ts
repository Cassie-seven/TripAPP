// import { SQLite } from '@ionic-native/sqlite';
import {  AlertController, ToastController } from 'ionic-angular';
// import { Network } from '@ionic-native/network';
import { ApiConfig } from './api.config';
import { AppLang } from './app.lang';
import { AppStorage } from './app.storage';
import {AppMember} from '../app/app.member';
import {TabsPage} from '../pages/tabs/tabs';
import { CommonApi } from '../providers/common.api';

export class AppUtil {
    public static isLessThenAndroid5: boolean = false; //<= android 4.4
    public static isIOS: boolean = false; //是否是在Iphone设备, 不论是微信打开,还是APP.
    public static isMicroMessager: boolean = false; //是否是在微信内置浏览器打开.
    public static isCapturePopstate: boolean = false; //是否是在微信内置浏览器捕获popstate.
    public static isPushStateSelf: boolean = false; //是否是在微信内置浏览器增加pushState.
    public static isVisitor: boolean = false;
  public static isHiddenTutorial: boolean = false;
  public static isShowingTutorial: boolean = false; //是否正在Show Tutorial
    public static isShareStatus: boolean = false;  //标记是否是通过分享链接打开. 
    // public static isBaojian: boolean = isBaojianVersion; //Baojian Version只显示中介考试模块.
    public static osVersion = '';
    public static AppEdition = ''; //App edition: 栗子学院:'',  企业版:'EE'
    public static AppEdnSwitchMode = '0';  //0: 企业, 栗子学院, 监管(分省)三者切换,  1: 扁平化整合模式.
    public static unreadMsgCount = 0;
    public static downloadList = [];//下载列表查看状态
    public static downloadAuthorization = false; // 下载视频是否授权访问手机内存
    public static HtmlDecode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");

        s = s.replace("/upload/", ApiConfig.getUploadPath());

        //alert(s);
        return s;
    }
    public static pushStateSelf(pagename) {
        if (this.isPushStateSelf) {
            //配合popstate事件监听, 解决微信或浏览器回退时的用户体验问题, 以达到APP的体验效果
            //所有tab子页,以及push的页面会改变Hashcode,需要在didenter调用此函数. modal窗口不需要
            // var url = window.location.href;
            //  url = url.substr(0, url.lastIndexOf('/') + 1) + pagename;
            //  window.history.pushState(null, '', url);
            //didenter事件里, URL还是前一页的.
            setTimeout(() => {
                window.history.pushState(null, '', window.location.href);
                console.log(window.location.href);
            }, 50);
        }
    }
    public static formatLocalImgPath(imgurl) {
      if (AppUtil.isMicroMessager) { //微信版,本地图片应用CDN上取
        return ApiConfig.serverCDN + imgurl;
      }
      return imgurl;
    }
    public static Toast(toastCtrl: ToastController,msg) {
        let toast = toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    public static MiddleToast(toastCtrl: ToastController, msg) {
        let toast = toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle'
        });
        toast.present();
    }
    public static Alert(alertCtrl: AlertController, msg) {
        let alert = alertCtrl.create({
            title: AppLang.Lang["warning"],
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }
  
    public static FormatShortDateTimeStr(dtstr: string) {
        try {
            //03-13 14:23
            var val = this.NewDate(dtstr);
            return this.pad(val.getMonth() + 1, 2) + "-" + this.pad(val.getDate(), 2) +
                " " + this.pad(val.getHours(), 2) + ":" + this.pad(val.getMinutes(), 2); // + ":" + this.pad(val.getSeconds(), 2);
        }
        catch (e) {
        }
        return "";
    }
    public static FormatShortDateTimeDate(dtstr: string) {
        try {
            //2017-12-11
            var val = this.NewDate(dtstr);
            return val.getFullYear() + "-" + this.pad(val.getMonth() + 1, 2) + "-" + this.pad(val.getDate(), 2); // + ":" + this.pad(val.getSeconds(), 2);
        }
        catch (e) {
        }
        return "";
    }
    public static FormatDateTime(val: Date) {
        if (AppLang.LangCode == 'zh-cn') {
            return val.getFullYear() + "-" + this.pad(val.getMonth() + 1, 2) + "-" + this.pad(val.getDate(), 2) +
                " " + this.pad(val.getHours(), 2) + ":" + this.pad(val.getMinutes(), 2) + ":" + this.pad(val.getSeconds(), 2);
        }
        else {
            return this.pad(val.getMonth() + 1, 2) + "/" + this.pad(val.getDate(), 2) + "/" + val.getFullYear() +
                " " + this.pad(val.getHours(), 2) + ":" + this.pad(val.getMinutes(), 2) + ":" + this.pad(val.getSeconds(), 2);
        }
    }
    public static FormatStandDateTime(val: Date) {
            //API返回后台用格式
        try {
            return val.getFullYear() + "-" + this.pad(val.getMonth() + 1, 2) + "-" + this.pad(val.getDate(), 2) +
                " " + this.pad(val.getHours(), 2) + ":" + this.pad(val.getMinutes(), 2) + ":" + this.pad(val.getSeconds(), 2);
        }
        catch (e) {
        }
        return '';
    }

    public static FormatDate(dtstr, formatToday, lang: string = '') {
        try {
            //2017-01-02 14:23
            lang = lang == '' ? AppLang.LangCode : lang;
            var val = this.NewDate(dtstr);
            var ret = '';
            if (lang == 'zh-cn') {
                ret = val.getFullYear() + "-" + this.pad(val.getMonth() + 1, 2) + "-" + this.pad(val.getDate(), 2);
            }
            else {
                ret = this.pad(val.getMonth() + 1, 2) + "/" + this.pad(val.getDate(), 2) + "/" + val.getFullYear();
            }
            if (formatToday) {
                var today = new Date();
                if (val.getFullYear() == today.getFullYear() && val.getMonth() == today.getMonth() &&
                    val.getDate() == today.getDate()) {
                    ret = AppLang.Lang["today"];
                }
                else if (val.getFullYear() == today.getFullYear() && val.getMonth() == today.getMonth() &&
                    val.getDate() + 1 == today.getDate()) {
                    ret = AppLang.Lang["yesterday"];
                }
            }
            return ret;
        }
        catch (e) {
        }
        return "";
    }

    public static FormatDateTimeStr(dtstr: string) {
        try {
            var val = this.NewDate(dtstr);
            return this.FormatDateTime(val);
        }
        catch (e) {
        }
        return "";
    }
    public static NewDate(str) {
        str = str.replace('T', '-').replace(' ', '-').replace('.', '-').replace(/:/g, '-');
        str = str.split('-');
        var date = new Date();
        date.setFullYear(str[0], str[1] - 1, str[2]);
        date.setHours(str.length > 3 ? str[3] : 0, str.length > 4 ? str[4] : 0, str.length > 5 ? str[5] : 0); //, str[6] , no need ms
        return date;
    } 

    public static pad(num, n) {
        var len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    }
    public static FormatTicker(val) {
        var second = val % 60;
        val = val - second;
        val = (val / 60);
        var minute = val % 60;
        val = val - minute;
        var hour = (val / 60);

        return (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
        
    }

    public static FormatTickerNoHour(val)
    {
        var second = val % 60;
        val = val - second;
        val = (val / 60);
        var minute = val % 60;
        val = val - minute;
        var hour = (val / 60);

        return (hour>0?((hour < 10 ? "0" + hour : hour) + ":"):"") + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);

    }
    public static IsIOSTestUser() {
      return AppUtil.isIOS && (AppUtil.isVisitor || AppMember.GetInstance().id == 210058);
    }
    public static IsMobileNo(str){

      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        return myreg.test(str);
    }

    public static IsEmail(str) {

        var myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        return myreg.test(str);
    }

    public static IsRealNameForm(str) {
      if (str.length < 2) {
        return false
      }
      var myreg = /^[\u4E00-\u9FA5A-Za-z]+$/;
      return myreg.test(str);
   }

    public static IsIDCardNumber(str) {

        var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return myreg.test(str);
    }
    public static FormatPercent(val) {
        val = val * 100.0;
        return val.toFixed(2) + '%';
    }
    public static FormatNumberKilo(val) {
        val = val * 1.0;
        if (val < 1000) {
          return val;
        }
        val = val / 1000.0;
        return val.toFixed(1) + 'k';
    }
    public static FormatPrice(val) {
        val = val * 1.0;
        return val.toFixed(2);
    }
    public static FormatNumber(val, digits) {
        if (typeof (val) == 'undefined') {
            val = 0;
        }
        val = val * 1.0;
        return val.toFixed(digits);
    }

    public static FormatCredit(val) { //学分 
        if (typeof (val) == 'undefined') {
            val = 0;
        }
        var credit = val / 10.0;
        return credit.toFixed(credit == Math.round(val / 10) ? 0 : 1);
    }
    
    public static ToBase64(str) {
        if (typeof (str) == 'undefined' || str == null || str == "") {
            return "";
        }
        return Base64.encode(str);
    }

    public static FromBase64(str) {
        if (typeof (str) == 'undefined' || str == null || str == "") {
            return "";
        }
        return Base64.decode(str);
    }

    // public static IsWifi(network: Network) {
    //     var isWifi = true;
    //     try {
    //         //网页版怎么检测?

    //         if (!network.type || network.type == 'wifi' || network.type == 'none') {
    //             isWifi = true;
    //         }
    //         else {
    //             isWifi = false;
    //         }
    //     }
    //     catch (e) { }
    //     return isWifi;
    // }

    // public static confirmForVisitorLogin(alertCtrl: AlertController, curpage: any, callback_buy:any) {
    //     var confirmDlg = alertCtrl.create({
    //         title: AppLang.Lang["confirmbuy"],  //什么标题?
    //         message: AppLang.Lang["loginlizibuycanuseiosandandroiddirectbuyonlycanusethedevice"], //您需要登陆后才能购买
    //         buttons: [
    //             {
    //                 text: AppLang.Lang["loginlizixueyuanbuy"],
    //                 handler: () => {
    //                     TabsPage.homeTab.tabs.getByIndex(3).show = true;
    //                     var member = AppMember.GetInstance();
    //                     AppUtil.isVisitor = false;
    //                     curpage.dismiss();
    //                     member.logout();
    //                 }
    //             },
    //             {
    //                 text: AppLang.Lang["visitorbuy"],
    //                 handler: () => {

    //                     callback_buy();
    //                 }
    //             },
    //             {
    //                 text: AppLang.Lang["cancelbuy"],
    //                 role: 'cancel',
    //                 handler: () => {

    //                 }
    //             }
    //         ]
    //     });
    //     confirmDlg.present();
    // }

    public static saveVisitorPurchaseRecord(goodsType, goodsId) {
        //IOS 游客购买只允许当前设备使用
        if (AppUtil.isIOS && !AppUtil.isMicroMessager && AppUtil.isVisitor) {
            AppStorage.SaveItem('Purchased_' + AppMember.GetInstance().id + '_' + goodsType + goodsId, 1);
        }
    }
    public static hasVisitorPurchaseRecord(goodsType, goodsId) {
        //IOS 游客购买只允许当前设备使用
        if (AppUtil.isIOS && !AppUtil.isMicroMessager && AppUtil.isVisitor) {
            return AppStorage.getItem('Purchased_' + AppMember.GetInstance().id + '_' + goodsType + goodsId) == '1';
        }
        return false;
    }

    public static switchAppEdition(edition) {
      if (AppUtil.AppEdnSwitchMode == '0') {
        AppStorage.SaveItem('AppEdition_' + AppMember.GetInstance().id, edition);
        AppUtil.AppEdition = edition;
      }
      else {
        AppUtil.AppEdition = '';
      }
    }

    public static restoreAppEdition() {
      if (AppUtil.AppEdnSwitchMode == '0') {
        var ee = AppStorage.getItem('AppEdition_' + AppMember.GetInstance().id);
        AppUtil.AppEdition = ee != null ? ee : '';
      }
      else {
        AppUtil.AppEdition = '';
      }
    }
    public static isFirsttimeEnterApp() {
      var ee = AppStorage.getItem('AppEdition_' + AppMember.GetInstance().id);
      return ee == null;
    }
  public static isNeedShowZhiYeCountDown(interval_days) {
      if (interval_days > 0) {
        var ee = AppStorage.getItem('ZhiYeCntDown_' + AppMember.GetInstance().id);
        var curdt = new Date();
        curdt.setDate(curdt.getDate() - interval_days);
        if (ee == null || AppUtil.NewDate(ee) < curdt) {
          AppStorage.SaveItem('ZhiYeCntDown_' + AppMember.GetInstance().id, AppUtil.FormatStandDateTime(new Date()));
          return true;
        }
      }
      return false;
    }
    public static Storage = null;

  //微信公众号分享朋友及朋友圈Menu设置
//   public static setWeixinShareMenuForMP(commonApi: CommonApi, data: any) {
//     if (!AppUtil.isMicroMessager) {
//       return;
//     }
//       commonApi.getweixinjssdksign({ url: window.location.href.split('#')[0] }, false).then(result => {
//         if (result.data && result.code == 0) {
//           wx.config({
//             debug: false, // 开启调试模式,
//             appId: result.data.appid, // 必填，公众号的唯一标识
//             timestamp: result.data.timestamp, // 必填，生成签名的时间戳
//             nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
//             signature: result.data.signature,// 必填，签名，见附录1
//             jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//           });
//           setTimeout(() => {
//             wx.onMenuShareTimeline(data);
//             wx.onMenuShareAppMessage(data);
//           }, 1200);
//         }
//       });
//   }  
    
}

export class Base64 {

    // private property    
    private static _keyStr:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding    
    public static encode(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding    
    public static decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding    
   private static  _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding    
   private static  _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
} 
