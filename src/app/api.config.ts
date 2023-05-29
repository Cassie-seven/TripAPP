import { Headers, RequestOptions, Http, Response } from '@angular/http';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController, Loading} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {AppMember} from '../app/app.member';

export class ApiConfig {
    private static IsDebugMode = true;
    private static serverDomainForLive = "https://chestnutapp.lizixueyuan.com";   
    // private static serverDomainForQA = "http://chest.1yhkt.com";
    // private static serverDomainForQA = "http://192.168.1.168:8080";  
    // private static serverDomainForQA = "http://192.168.1.208:8053";
    // private static serverDomainForQA = "http://192.168.1.104:8090";
    // private static serverDomainForQA = "http://202.105.104.178:8810";//代理测试地址
    // private static serverDomainForQA = "http://10.0.92.104:8077";//本机代理测试地址
    // private static serverDomainForQA = "http://192.168.101.220:8077";
    // private static serverDomainForQA = "http://10.10.3.89:9000";
    // private static serverDomainForQA = "http://10.10.3.89:9100";
    // private static serverDomainForQA = "http://202.105.104.178:8888";
    // private static serverDomainForQA = "http://202.105.104.178:8889";
    // private static serverDomainForQA = "http://10.10.6.200:8888";
    // private static serverDomainForQA = "http://10.10.6.211:8888";
    // private static serverDomainForQA = "http://183.62.196.164:8086";
    // private static serverDomainForQA = "http://wfapp.shenjuyuan.com:8086" //正式;

    // private static serverDomainForQA = "http://wf.shenjuyuan.com:12345" //测试域名
    private static serverDomainForQA = "http://202.105.104.178:8888" //测试域名
    // private static serverDomainForQA = "https://www.sz-junhai.com:8889" //https域名 线上

    //private static serverDomainForQA = "http://192.168.1.223:8053";
  
    public static serverCDN = "https://cdn.lizixueyuan.com/mpwxstatic/";

    //public static gaodeKey ="https://restapi.amap.com/v3/geocode/geo?key=b741f2cc4d0e1558b2db688a26b03a0f&address=";
    public static currentSongInfo = null; //正在播放的歌曲信息
    public static getServerDomain() {
        return this.IsDebugMode ? this.serverDomainForQA : this.serverDomainForLive;
    }
    public static getApiUrl() {
        return this.getServerDomain() + "/appapi/"; 
    }
    public static getUploadPath() {
        return this.getServerDomain() + "/upload/";
    }
    public static getFileUploadAPI() {
        return this.getServerDomain() + "/fileupload";
    } 
    
    public static getDataBaseName() {
        return "alucard263096_speechlive.db";
    }

    public static ParamUrlencoded(json) {   
        var arr = new Array();
        for (let i in json) {
            arr.push(i + "=" + encodeURIComponent(json[i])); 
        }
        return arr.join("&");
    }
    private static TOKEN = null;
    public static RID = null;
    public static NAME = null;
    private static loading: Loading = null;
    private static loadingQueueCount = 0;

    public static MDSalt = "c5341a87b71ae5";

    public static GetHeader(url, postparam) {
        var sign = "";
        var fmd5str = "";
       // if (ApiConfig.TOKEN != null && ApiConfig.RID != null) {
         if (1==1) {
            var arr = new Array();
            for (let i in postparam) {
                arr.push(i);
            }
            arr=arr.sort();
            //alert(arr.join("&"));
            var jsonarr = new Array();
            for (let i of arr) {
                jsonarr[i] = postparam[i];
            }
            //var poststr = ApiConfig.ParamUrlencoded(jsonarr);

            var poststrarr = new Array();
            for (let i in jsonarr) {
                var str = jsonarr[i];
                if (typeof (str) != "undefined" && str != null) {
                    str = str.toString();
                }
                else {
                    str = "";
                }
                //str = str.replace(/[\-|\~|\_|\.|\!|\~|\*|\'|\(|\)]/g, "");
               // str = str.replace(/[\~|\']/g, "");
               // str = encodeURIComponent(str);
                poststrarr.push(i + "=" + (str.length > 1000 ? str.substr(0, 1000) : str));
            }
            var poststr = poststrarr.join("&");

            url = url.replace('://', '');
            url = url.substr(url.indexOf('/')); //remove domain
            var md5str = url + "~" + poststr + "~" + ApiConfig.MDSalt;// ApiConfig.TOKEN + "~" + ApiConfig.RID;
            md5str = md5str.toUpperCase();
            //fmd5str = md5str + ApiConfig.MDSalt;
            //console.info(md5str);
            

            sign = md5_chs.md5(md5str); // md5.hex_md5(md5str);
           // console.info(sign);
        }
		
        var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Sign': sign,
            //'TokenKey': ApiConfig.RID
            'Token': ApiConfig.TOKEN || ''
            //,'Fmd5str': fmd5str
        });
        return headers;
    }

    public static SetToken(token, rid,name) {
        ApiConfig.TOKEN = token;
        ApiConfig.RID = rid;
        ApiConfig.NAME = name;
    }
    public static ReSetToken() {
        ApiConfig.TOKEN = null;
        ApiConfig.RID = null;
    }
    public static MD5(str) {
        return md5.hex_md5(str);
    }

    public static LoadingCtrl: LoadingController = null;

    public static SetLoadingCtrl(loadCtrl: LoadingController) {
        ApiConfig.LoadingCtrl = loadCtrl;
    }

    public static GetLoadingModal(duration_ms=10000): Loading{
        var ctrl = ApiConfig.LoadingCtrl;
        if (ctrl != null && ApiConfig.loading == null) {
            ApiConfig.loadingQueueCount = 0;
            ApiConfig.loading = ctrl.create({
                spinner: 'ios',
                //cssClass: 'myloading',
                duration: duration_ms
            });
            ApiConfig.loading.present();
        }
        ApiConfig.loadingQueueCount++;
        return null;
    }

    public static DimissLoadingModal() {
        try {
            ApiConfig.loadingQueueCount--;
            if (ApiConfig.loading != null && ApiConfig.loadingQueueCount == 0) {
                ApiConfig.loading.dismiss();
                ApiConfig.loading = null;
                ApiConfig.loadingQueueCount = 0;
            }
        } catch (e) {

        }
    }

    public static ForceDimissLoadingModal() {
        try {
            if (ApiConfig.loading != null) {
                ApiConfig.loading.dismiss();
                ApiConfig.loading = null;
                ApiConfig.loadingQueueCount = 0;
            }
        } catch (e) {

        }
    }
	
	public static DataLoadedHandle(url,post,data):boolean {
        try {
            data = data.json();
			if(data.code!=null){
                if (data.code == "404" || data.code == "401" || data.code == "500") {
                    //console.error(data.return.debuggenSign);
                   //console.error(data.return.genSign);
                    return false;
                }
			}
            return true;

        } catch (e) {
			return false;
        }
    }

	public static ErrorHandle(url,post,error: Response) {
        try {
            //return Observable.throw(error.json().error || 'Server Error');
            var data = error.json();
            if(data.code == "401") {
                AppMember.GetInstance().logout();
            }
        } catch (e) {

        }
        return Promise.reject(error);
    }  	
}






// export class DBHelper {
//     private static instance = null;
//     private static sqlite: SQLite = null;
//     private dbname = "apidb.db";
//     private location = "default";
//     private dbready = false;
//     private db: SQLiteObject = null;
//     private DBHelper() {

//     }
//     public static init(sqlite) {
//         DBHelper.sqlite = sqlite;
//     }
//     public getDbName() {
//         return this.dbname;
//     }

//     public setDbName(dbname) {
//         this.dbname = dbname;
//     }

//     //这个方法要放在app.component运行一次，已进行数据库初始化的校验
//     public static GetInstance() {
//         if (DBHelper.instance == null) {
//             DBHelper.instance = new DBHelper();

//             DBHelper.sqlite.create({
//                 name: DBHelper.instance.dbname,
//                 location: DBHelper.instance.location
//             }).then(data => {
//                 DBHelper.instance.db = data;
//                 DBHelper.instance.dbready = true;
//             }, data => {
//                 var data1 = data;
//                 DBHelper.instance.dbready = false;
//             });
//         }
//         return DBHelper.instance;
//     }

//     public isDBReady() {
//         return this.dbready;
//     }


//     public batchUpdate(tablename, columns, data, callback) {
//         var objdb = this.db;
//         var help = this;

//         var idlist = new Array();
//         idlist.push(0);
//         for (let i in data) {
//             var id = data[i].id;
//             idlist.push(id);
//         }
//         objdb.executeSql("select id from " + tablename + " where id in (" + idlist.join(",") + ")", []).then((existsData => {

//             objdb.transaction(function (tx) {
//                 for (let i in data) {
//                     var id = data[i].id;
//                     var isexists = false;
//                     for (var c = 0; c < existsData.rows.length; c++) {
//                         if (id == existsData.rows.item(c).id) {
//                             isexists = true;
//                             break;
//                         }
//                     }
//                     var perUpdateData = help.fixUpdateData(columns, data[i]);
//                     perUpdateData.push(id);
//                     var sql = "";
//                     if (isexists) {
//                         sql = "update " + tablename + " set updated_date=datetime('now', 'localtime') ";
//                         for (let col in columns) {
//                             sql += " ," + col + "=? ";
//                         }
//                         sql += " where id=? ";
//                     } else {
//                         sql = "insert into " + tablename + " (updated_date";
//                         for (let col in columns) {
//                             sql += " ," + col + " ";
//                         }
//                         sql += " ,id) values (datetime('now', 'localtime') ";
//                         for (let col in columns) {
//                             sql += " ,? ";
//                         }
//                         sql += " ,?);"
//                     }
//                     tx.executeSql(sql, perUpdateData);
//                 }
//             }).then(txResult => {
//                 callback();
//             }, (txerr) => {
//                 alert("Batch update error for debug :" + txerr.message);
//             });
//         }));
//     }
//     public fixUpdateData(columns, data) {
//         var ret = new Array();
//         for (let i in columns) {
//             ret.push(data[i]);
//         }
//         return ret;
//     }

//     public query(sql, param, callback) {
//         this.db.executeSql(sql, param).then(data => {

//             var ret = new Array();
//             for (var i = 0; i < data.rows.length; i++) {
//                 ret.push(data.rows.item(i));
//             }
//             callback(ret);
//         }).catch((err) => {
//             alert("query error for debug " + err.message
//             );
//         });;
//     }

//     public createTable(tablename, columns) {
//         this.db.executeSql("CREATE TABLE IF NOT EXISTS " + tablename + " (id int,updated_date datetime)", {}).then((data) => {

//             for (let col in columns) {

//                 try {
//                     this.db.executeSql("ALTER TABLE " + tablename + " add column " + col + " " + columns[col], []).then(() => { }, (err) => {

//                     });
//                 } catch (ex) {

//                 }
//             }

//         }).catch(() => {

//         });
//     }

//     public getLastestUpdatedTime(objname, callback) {
//         this.db.executeSql("CREATE TABLE IF NOT EXISTS tb_api_lastcall (objname varchar,calltime datetime)", {}).then((data) => {

//             this.db.executeSql("select calltime from tb_api_lastcall where objname=?", [objname]).then(data => {

//                 var ret = '1970-01-01 00:00:00';
//                 if (data.rows.length > 0) {
//                     ret = data.rows.item(0).calltime;
//                     var val = new Date(data.rows.item(0).calltime);
//                     ret = val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate() +
//                         " " + val.getHours() + ":" + val.getMinutes() + ":" + val.getSeconds()
//                 }
//                 callback(ret);
//             });

//         }).catch(() => {

//         });

//     }
//     public updateLastestCallTime(objname) {

//         this.db.executeSql("select calltime from tb_api_lastcall where objname=?", [objname]).then(data => {

//             var now = new Date();
//             if (data.rows.length > 0) {
//                 this.db.executeSql("update tb_api_lastcall set calltime=? where objname=?", [now, objname]).then((data1) => {

//                 }, (err) => {
//                     console.error('Unable to execute sql: ', err);
//                 });;
//             } else {
//                 this.db.executeSql("insert into tb_api_lastcall (objname,calltime) values (?,?)", [objname, now]).then((data1) => {

//                 }, (err) => {
//                     console.error('Unable to execute sql: ', err);
//                 });
//             }
//         });

//     }
//     public static FormatDateTime(val: Date) {
//         return;
//     }

// }


class md5_chs {
    public static md5(string) {
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        string = md5_chs.Utf8Encode(string);
        x = md5_chs.ConvertToWordArray(string);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = md5_chs.FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = md5_chs.FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = md5_chs.FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = md5_chs.FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = md5_chs.FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = md5_chs.FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = md5_chs.FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = md5_chs.FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = md5_chs.FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = md5_chs.FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = md5_chs.FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = md5_chs.FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = md5_chs.FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = md5_chs.FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = md5_chs.FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = md5_chs.FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = md5_chs.GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = md5_chs.GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = md5_chs.GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = md5_chs.GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = md5_chs.GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = md5_chs.GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = md5_chs.GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = md5_chs.GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = md5_chs.GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = md5_chs.GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = md5_chs.GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = md5_chs.GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = md5_chs.GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = md5_chs.GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = md5_chs.GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = md5_chs.GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = md5_chs.HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = md5_chs.HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = md5_chs.HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = md5_chs.HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = md5_chs.HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = md5_chs.HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = md5_chs.HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = md5_chs.HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = md5_chs.HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = md5_chs.HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = md5_chs.HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = md5_chs.HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = md5_chs.HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = md5_chs.HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = md5_chs.HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = md5_chs.HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = md5_chs.II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = md5_chs.II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = md5_chs.II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = md5_chs.II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = md5_chs.II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = md5_chs.II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = md5_chs.II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = md5_chs.II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = md5_chs.II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = md5_chs.II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = md5_chs.II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = md5_chs.II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = md5_chs.II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = md5_chs.II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = md5_chs.II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = md5_chs.II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = md5_chs.AddUnsigned(a, AA);
            b = md5_chs.AddUnsigned(b, BB);
            c = md5_chs.AddUnsigned(c, CC);
            d = md5_chs.AddUnsigned(d, DD);
        }
        var temp = md5_chs.WordToHex(a) + md5_chs.WordToHex(b) + md5_chs.WordToHex(c) + md5_chs.WordToHex(d);
        return temp.toUpperCase();
    }
    private static RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    private static AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    private static F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    private static G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    private static H(x, y, z) {
        return (x ^ y ^ z);
    }
    private static I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    private static FF(a, b, c, d, x, s, ac) {
        a = md5_chs.AddUnsigned(a, md5_chs.AddUnsigned(md5_chs.AddUnsigned(md5_chs.F(b, c, d), x), ac));
        return md5_chs.AddUnsigned(md5_chs.RotateLeft(a, s), b);
    }
    private static GG(a, b, c, d, x, s, ac) {
        a = md5_chs.AddUnsigned(a, md5_chs.AddUnsigned(md5_chs.AddUnsigned(md5_chs.G(b, c, d), x), ac));
        return md5_chs.AddUnsigned(md5_chs.RotateLeft(a, s), b);
    }
    private static HH(a, b, c, d, x, s, ac) {
        a = md5_chs.AddUnsigned(a, md5_chs.AddUnsigned(md5_chs.AddUnsigned(md5_chs.H(b, c, d), x), ac));
        return md5_chs.AddUnsigned(md5_chs.RotateLeft(a, s), b);
    }
    private static II(a, b, c, d, x, s, ac) {
        a = md5_chs.AddUnsigned(a, md5_chs.AddUnsigned(md5_chs.AddUnsigned(md5_chs.I(b, c, d), x), ac));
        return md5_chs.AddUnsigned(md5_chs.RotateLeft(a, s), b);
    }
    private static ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    private static WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    public static Utf8Encode(string) {
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
}


// 对中文支持不好
class md5 {
    /*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
public static hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
    public static b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
    public static chrsz = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the public statics you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
    public static hex_md5(s) { return md5.binl2hex(md5.core_md5(md5.str2binl(s), s.length * md5.chrsz)); }
    public static b64_md5(s) { return md5.binl2b64(md5.core_md5(md5.str2binl(s), s.length * md5.chrsz)); }
    public static str_md5(s) { return md5.binl2str(md5.core_md5(md5.str2binl(s), s.length * md5.chrsz)); }
    public static hex_hmac_md5(key, data) { return md5.binl2hex(md5.core_hmac_md5(key, data)); }
    public static b64_hmac_md5(key, data) { return md5.binl2b64(md5.core_hmac_md5(key, data)); }
    public static str_hmac_md5(key, data) { return md5.binl2str(md5.core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
    public static md5_vm_test() {
        return md5.hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
    public static core_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = md5.safe_add(a, olda);
        b = md5.safe_add(b, oldb);
        c = md5.safe_add(c, oldc);
        d = md5.safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}

/*
 * These public statics implement the four basic operations the algorithm uses.
 */
    public static md5_cmn(q, a, b, x, s, t) {
        return md5.safe_add(md5.bit_rol(md5.safe_add(md5.safe_add(a, q), md5.safe_add(x, t)), s), b);
}
public static md5_ff(a, b, c, d, x, s, t) {
    return md5.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
public static md5_gg(a, b, c, d, x, s, t) {
    return md5.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
public static md5_hh(a, b, c, d, x, s, t) {
    return md5.md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
public static md5_ii(a, b, c, d, x, s, t) {
    return md5.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
public static core_hmac_md5(key, data) {
    var bkey = md5.str2binl(key);
    if (bkey.length > 16) bkey = md5.core_md5(bkey, key.length * md5.chrsz);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = md5.core_md5(ipad.concat(md5.str2binl(data)), 512 + data.length * md5.chrsz);
    return md5.core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
public static safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
public static bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
public static str2binl(str) {
    var bin = Array();
    var mask = (1 << md5.chrsz) - 1;
    for (var i = 0; i < str.length * md5.chrsz; i += md5.chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / md5.chrsz) & mask) << (i % 32);
    return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
public static binl2str(bin) {
    var str = "";
    var mask = (1 << md5.chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += md5.chrsz)
        str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
    return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
public static binl2hex(binarray) {
    var hex_tab = md5.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
public static binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
            | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
            | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += md5.b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}


}
