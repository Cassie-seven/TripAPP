import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

@Injectable()
export class PlaylistApi extends ApiBase {

    constructor(public http: Http) {
        super(http);
    }
    public add(data, showLoadingModal: boolean = false) {
        return super.postRequest(data , "playlistapi/add", false, showLoadingModal);
    } 
    public update(data, showLoadingModal: boolean = false) {
        return super.postRequest(data, "playlistapi/update", false, showLoadingModal);
    } 
    public delete(data, showLoadingModal: boolean = false) {
        return super.postRequest(data, "playlistapi/delete", false, showLoadingModal);
    } 
    public getplaylist(data, showLoadingModal: boolean = false) {
        return super.postRequest(data, "playlistapi/getplaylist", false, showLoadingModal);
    } 
}