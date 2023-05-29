import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiBase } from './apibase';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommentApi extends ApiBase {
  constructor(public http: Http) {
    super(http);
  }
  //留言 #传入 course_id content
  public set(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "coursecommentapi/set", false, showLoadingModal);
  }
  //回复留言  #传入  comment_id content
  public reply(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "coursecommentapi/reply", false, showLoadingModal);
  }
  //或者取消点赞 #传入 comment_id thumbup  true点赞false取消点赞
  public thumbup(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "coursecommentapi/thumbup", false, showLoadingModal);
  }
  //显示留言（滑动分页，所以不需要获取总条数） #传入 course_id pageNum pageSize hot  true按照点赞量排序false按照时间排序

  public show  (data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "coursecommentapi/show", false, showLoadingModal);
  }
  //获取名师列表banner
  public banner(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "starteacherapi/banner", false, showLoadingModal);
  }
  //获取名师列表
  public list(data, showLoadingModal: boolean = true) {
    return super.postRequest(data, "starteacherapi/list", false, showLoadingModal);
  }
}
