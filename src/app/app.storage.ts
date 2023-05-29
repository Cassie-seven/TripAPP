// import { SQLite } from '@ionic-native/sqlite';
// import {  AlertController, ToastController } from 'ionic-angular';
// import { ApiConfig } from './api.config';
// import { AppLang } from './app.lang';

export class AppStorage
{
    static storage = window.localStorage;
    public static SaveItem(key, val)
    {
       
        if (typeof (val) == 'object') {
            val = JSON.stringify(val);
        }
        else if (typeof (val) == 'undefined') {
            return;
        }
        this.storage.setItem(this.genKey(key), val);
    }

    public static getItem(key)
    {
        return this.storage.getItem(this.genKey(key));
    }
    public static updateItem(key, val)
    {
    }

    public static getJSONItem(key) {
        let val = this.getItem(key);
        if (val != null && val != '') {
            try {
                val = JSON.parse(val);
            }
            catch (e) {

            }
        }
        return val;
    }

    public static genKey(key)
    {
        return 'com.zhongzilian.chestnutapp_' + key;
    }

    public static deleteItem(key)
    {
        this.storage.removeItem(this.genKey(key));
    }
}
