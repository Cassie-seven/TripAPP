
export class AppLang {


  public static Lang : Object = {};
  public static LangMenber: Object = {}; // 我的个人中心
  public static LangLocalMusic: Object = {}; // 本地音乐

  public static init() {
 
    AppLang.LangMenber["bluetoothConnection"] = "蓝牙连接";
    AppLang.LangMenber["instructions"] = "使用说明"; 
    AppLang.LangMenber["setting"] = "设置";
    AppLang.LangMenber["me"] = "我的";
    AppLang.LangMenber["logout"] = "退出登录";
    AppLang.LangMenber["modifypassword"] = "修改密码";
    AppLang.LangMenber["versioninfo"] = "版本信息";
    
    AppLang.LangLocalMusic["localmusic"] = "本地音乐";
    AppLang.LangLocalMusic["single"] = "单曲";
    AppLang.LangLocalMusic["singer"] = "歌手";
    AppLang.LangLocalMusic["album"] = "专辑";
    AppLang.LangLocalMusic["playlist"] = "播放列表";

    //home page start
    AppLang.Lang["home"] = "首页";
    AppLang.Lang["home_title"] = "栗子学院";
    AppLang.Lang["course"] = "课程"; 
    AppLang.Lang["PressedOnceToExit"] = "再按一次退出应用!";
    AppLang.Lang["recommand"] = "推荐";
    AppLang.Lang["forecast"] = "预告";
    AppLang.Lang["playrecord"] = "播放记录";
    AppLang.Lang["pullingText"] = "下拉刷新";
    AppLang.Lang["refreshingText"] = "正在刷新..."; 
    AppLang.Lang["more"] = "更多";
    AppLang.Lang["newestspeech"] = "最新作品";
    AppLang.Lang["relatedspeechlist"] = "相关作品列表";
    AppLang.Lang["norelatedspeech"] = "暂无相关作品";
    AppLang.Lang["modifyphoto"] = "修改头像";
    AppLang.Lang["mobilephotos"] = "从手机相册选择";
    AppLang.Lang["takeapicture"] = "拍一张";
    AppLang.Lang["clearrecord"] = "清空记录";
    AppLang.Lang["clearrecordmsg"] = "确定要清空所有播放记录?";
    AppLang.Lang["today"] = "今天";
    AppLang.Lang["yesterday"] = "昨天";
    AppLang.Lang["norecordmsg"] = "还没有记录哦~";
    AppLang.Lang["updatesuc"] = "修改成功";
    AppLang.Lang["updatephotofail"] = "未修改成功";
    AppLang.Lang["applying"] = "申请";
    AppLang.Lang["category"] = "分类";
    AppLang.Lang["yourmobilenum"] = "您的手机号码：";
    AppLang.Lang["acceptverifycode"] = "将收到一条6位的验证码短信";
    AppLang.Lang["perfectinformation"] = "完善用户信息";
    AppLang.Lang["sendmsfail"] = "发送短信失败";
    AppLang.Lang["repeatget"] = "重新获取";
    AppLang.Lang["platformagreement"] = "栗子学院平台服务协议";
    AppLang.Lang["registeragreement"] = "栗子学院注册服务协议";
    AppLang.Lang["agreementrule"] = "专家直播功能使用规则";
    AppLang.Lang["registerreadandagree"] = "注册表示你已阅读并同意";
    AppLang.Lang["submitverifycode"] = "提交验证码";
    AppLang.Lang["bindmobilenumber"] = "绑定手机号码";
    AppLang.Lang["mobilenumber"] = "手机号码";
      AppLang.Lang["mobileregister"] = "手机注册";
      AppLang.Lang["nowregister"] = "立即注册";
    AppLang.Lang["nextstep"] = "下一步";
    AppLang.Lang["mobile"] = "手机";
    AppLang.Lang["password"] = "密码";
    AppLang.Lang["inputpassword"] = "请输入密码";
    AppLang.Lang["passwordnotempty"] = "密码不能为空";
    AppLang.Lang["passwordlengthnotlessthanfive"] = "密码长度不能小于5";
    AppLang.Lang["newpassword"] = "新密码";
    AppLang.Lang["forgetpassword"] = "忘记密码?";
    AppLang.Lang["mobileverifycodelogin"] = "手机验证码登录";
    AppLang.Lang["checkpassword"] = "确认密码";
    AppLang.Lang["submitregister"] = "完成注册";
    AppLang.Lang["ishaveaccount"] = "已有账号，";
    AppLang.Lang["createaccount"] = "创建新用户"; 
    AppLang.Lang["finish"] = "完成"; 
    AppLang.Lang["inputmobileno"] = "请输入手机号码或账号";
    AppLang.Lang["inputusername"] = "请输入2～12个字符为用户名";
    AppLang.Lang["inputrealname"] = "请输入2～6个字符为真实姓名";
    AppLang.Lang["searchcompany"] = "请输入公司名称(如:太平洋番禺)";
    AppLang.Lang["inputcompany"] = "请输入所属公司名";
    AppLang.Lang["inputtitle"] = "请输入所属公司职位";
    AppLang.Lang["inputrealname"] = "请输入真实姓名";
    AppLang.Lang["inputidnumber"] = "请输入证件号码";
    AppLang.Lang["inputpassword"] = "请输入密码";
    AppLang.Lang["twotimepasswordwasnotthesame"] = "两次密码输入不一致";
    AppLang.Lang["incorrectoriginalpassword"] = "原密码错误";
    AppLang.Lang["verifycodeinputerror"] = "验证码输入错误";
    AppLang.Lang["modifypasswordsuccess"] = "修改密码成功";
    AppLang.Lang["setpasswordsuccess"] = "设置密码成功";
    AppLang.Lang["pleaseinputverifycode"] = "请输入6位数验证码";
    AppLang.Lang["verifycodelogin"] = "验证码登录";
    AppLang.Lang["resetpassword"] = "重置密码";
    AppLang.Lang["inputcorrectmobileno"] = "请填写正确的手机号";
    AppLang.Lang["mobilenumberwasnotregisted"] = "该手机号未注册";
    AppLang.Lang["inputmobilenoorpassword"] = "手机号/用户名或密码不正确";
    AppLang.Lang["mobilenumberwasregisted"] = "该手机号已注册";
    AppLang.Lang["registerfailmsg"] = "用户注册失败, 请稍后重试!";
    AppLang.Lang["sendVerifyCode"] = "发送验证码";
    AppLang.Lang["wait"] = "等待";
    AppLang.Lang["mobilenoerror"] = "手机号码不正确";
    
    AppLang.Lang["login"] = "登录";
    AppLang.Lang["promockLogin"] = "专家模拟登录";
    AppLang.Lang["wechatLogin"] = "微信登录";
    AppLang.Lang["register"] = "注册";
    AppLang.Lang["persondata"] = "个人信息";
    AppLang.Lang["companyinformation"] = "Copyright@ 2018-2020 SmartVoice";
   
 
    
    AppLang.Lang["introduce"] = "自我介绍";
    AppLang.Lang["wechatloginfail"] = "微信登录失败";
    AppLang.Lang["authorizationfailures"] = "授权失败";
    AppLang.Lang["profilephoto"] = "头像";
    AppLang.Lang["username"] = "用户名";
    AppLang.Lang["noupdata"] = "无法更新";
    AppLang.Lang["sex"] = "性别";
    AppLang.Lang["male"] = "男";
    AppLang.Lang["female"] = "女";
    AppLang.Lang["modifypassword"] = "修改密码";
    AppLang.Lang["makesuremodify"] = "确认修改";
    AppLang.Lang["setpassword"] = "设置密码";
    AppLang.Lang["save"] = "保存";
    AppLang.Lang["originalpassword"] = "原密码";
    AppLang.Lang["loginaccount"] = "登录账号";
    AppLang.Lang["inputaccount"] = "请填写账号";
    AppLang.Lang["me"] = "我的";
    AppLang.Lang["planStartTime"] = "计划开始时间";
    AppLang.Lang["chatcontenthere"] = "在这里输入聊天内容";
    AppLang.Lang["send"] = "发送";
    AppLang.Lang["search"] = "搜索";
    AppLang.Lang["cancel"] = "取消";
    AppLang.Lang["OK"] = "确定";
    AppLang.Lang["submit"] = "提交";
    AppLang.Lang["wanring"] = "警告";
    AppLang.Lang["ok"] = "好的";
    AppLang.Lang["waitaminute"] = "再等等";
    AppLang.Lang["confirmstartspeech"] = "开始？";

    AppLang.Lang["inlive"] = "正在直播中";
    AppLang.Lang["outlive"] = "已退出直播";

    AppLang.Lang["catelist"] = "分类列表";
    AppLang.Lang["wantlisten"] = "人想听";
    AppLang.Lang["playhaveproblem"] = "直播出现异常，请重新打开进入。";
    AppLang.Lang["playerrorretry"] = "直播出现异常或主播已停止，正在尝试重新连接。";
    AppLang.Lang["playsuccess"] = "直播已开始, 欢迎收听!";
    AppLang.Lang["getplaystatuserror"] = "无法获取播放器状态, 如果播放出现问题, 建议退出重新进入!";
    AppLang.Lang["playerrormsg"] = "视频播放异常或网络故障, 请稍后重试。";
    AppLang.Lang["playstallederrormsg"] = "网络故障或网速极慢, 请稍后重试。";

    AppLang.Lang["kindlyreminder"] = "温馨提示";
    AppLang.Lang["playnonwifimsg"] = "当前是非WIFI网络, 可能消耗流量, 点击继续~";
    AppLang.Lang["playcontinue"] = "继续观看";
    AppLang.Lang["unallowforwardmsg"] = "首次学习不允许快进哦~";

    
    AppLang.Lang["versionchecktitle"] = "发现新版本";
    AppLang.Lang["versioncheckmsg"] = "发现新版本:{0}. 建议您马上更新!";
    AppLang.Lang["appupdatecancel"] = "以后再说";
    AppLang.Lang["appupdateok"] = "立即更新";
    AppLang.Lang["downloadbackend"] = "后台下载";
    AppLang.Lang["appupdatefail"] = "更新失败, 请稍后重试!";
    AppLang.Lang["downloadtitle"] = "正在下载更新：";
    AppLang.Lang["sharedownload"] = "分享下载";
    AppLang.Lang["lizixueyuanappuserexperienceismore"] = "栗子学院APP用户体验更佳";
    AppLang.Lang["clickdownload"] = "点击下载";

    AppLang.Lang["account"] = "账号";
    AppLang.Lang["photo"] = "图片";
    AppLang.Lang["people"] = "人";
    AppLang.Lang["person_time"] = "人已购"; //"人次";
    AppLang.Lang["period_validity"] = "有效期";
    AppLang.Lang["pvalidity_perm"] = "永久有效";
    AppLang.Lang["pvalidity_day"] = "天";
    AppLang.Lang["pvalidity_cnt"] = "次";
    AppLang.Lang["reward"] = "打赏";
    AppLang.Lang["price_frees"] = "免费";
    AppLang.Lang["buy_now"] = "立即购买";
    AppLang.Lang["playpaused"] = "已暂停";
    AppLang.Lang["mywallet"] = "我的钱包";
    AppLang.Lang["mygive"] = "我的赠送";
    AppLang.Lang["mycoupon"] = "我的优惠券";
    AppLang.Lang["coupon"] = "优惠券"; 
    AppLang.Lang["alreadyused"] = "已使用";
    AppLang.Lang["notused"] = "未使用"; 
    AppLang.Lang["expired"] = "已过期"; 
    AppLang.Lang["immediateuse"] = "立即使用"; 
    AppLang.Lang["platformpreference"] = "平台优惠"; 
    AppLang.Lang["cashcoupon"] = "现金优惠券"; 
    AppLang.Lang["nouseofcoupons"] = "暂不使用优惠券";
    AppLang.Lang["receivenothresholdcoupon"] = "领取现金抵用优惠券啦";
    AppLang.Lang["successfulcouponcollection"] = "领取成功,请到“我的优惠券”查看"; 
    AppLang.Lang["recharge"] = "充值";
    AppLang.Lang["rechargerecord"] = "充值记录";
    AppLang.Lang["consumerecord"] = "消费记录";
 
    AppLang.Lang["commonquestions"] = "常见问题";
    AppLang.Lang["nobuycourse"] = "～暂时没有购买过课程哦～";
    AppLang.Lang["nocontent"] = "暂无内容";
    AppLang.Lang["pleaseselectrechargeamount"] = "请选择充值金额";
    AppLang.Lang["pleaseselectpayway"] = "请选择支付方式";
    AppLang.Lang["payinstructions"] = "充值说明";
    AppLang.Lang["alipay"] = "支付宝支付";
    AppLang.Lang["iospay"] = "苹果支付";
    AppLang.Lang["wxpay"] = "微信支付";
    AppLang.Lang["wxmppay"] = "微信支付";
    AppLang.Lang["nowpay"] = "立即支付";
    AppLang.Lang["confirmpay"] = "确认支付";
    AppLang.Lang["confirmpayyuan"] = "确认支付 ¥";
    AppLang.Lang["yuan"] = "元";
    AppLang.Lang["otheramount"] = "其他金额";
    AppLang.Lang["otherdouamount"] = "其他数量";
 
    AppLang.Lang["price"] = "价格";
    AppLang.Lang["totalprice"] = "总价";
    AppLang.Lang["warmprompt"] = "温馨提示:";
    AppLang.Lang["balance"] = "余额";
    AppLang.Lang["rechargefail"] = "未充值成功";
    AppLang.Lang["rechargesuccess"] = "充值成功";
    AppLang.Lang["payfail"] = "订单支付失败, 可能存在网络故障, 请稍后重试!";
    AppLang.Lang["payfailshortmsg"] = "订单支付失败";
    AppLang.Lang["payfailcancel"] = "您已取消该订单的支付!";
    AppLang.Lang["payprocessing"] = "订单支付还正在处理中, 请稍后在我的支付中查看状态!";
    AppLang.Lang["paysuccess"] = "支付成功";
    AppLang.Lang["lackofbalanceandrecharge"] = "余额不足,去充值";
    AppLang.Lang["recharge_type"] = "充值类型";
    AppLang.Lang["recharge_amount"] = "充值金额";
    AppLang.Lang["recharge_time"] = "充值时间";
    AppLang.Lang["pay_type"] = "支付类型";
    AppLang.Lang["pay_amount"] = "支付金额";
    AppLang.Lang["pay_time"] = "支付时间";
    AppLang.Lang["pay_detail"] = "支付详情";
 
    AppLang.Lang["rewardsuccess"] = "打赏成功";
    AppLang.Lang["rewardfail"] = "未打赏成功";
    AppLang.Lang["realname"] = "姓名";
 
    AppLang.Lang["mypayrecord"] = "我的支付记录";
    AppLang.Lang["payrecord"] = "支付记录";
  
    AppLang.Lang["modifymobile"] = "更换手机号";
 
 
    AppLang.Lang["original_mobilephonenumber"] = "原手机号";
    AppLang.Lang["new_mobilephonenumber"] = "新手机号";
    AppLang.Lang["inputmobilephonenumber"] = "请输入手机号码";
  
    AppLang.Lang["periodofvalidity"] = "有效期：";
    AppLang.Lang["intradayvalidity"] = "有效期至：";
  
    AppLang.Lang["all"] = "全部";
    AppLang.Lang["totalselection"] = "全选";
    AppLang.Lang["canceltotalselection"] = "取消全选";
     
 
    AppLang.Lang["pleaseinputcorrectbindmobilenumber"] = "请输入正确绑定的手机号码";
    AppLang.Lang["mobilealreadybindwechat"] = "您的手机号已绑定了其他微信号";
    AppLang.Lang["pleaseinputcorrectbindmobilenumber"] = "请输入正确绑定的手机号码"
    AppLang.Lang["nocontenterrmsg"] = "未获取到数据, 请稍后重试!";
  
    AppLang.Lang["noonlinelookforwardto"] = "还没有上线,敬请期待~~~";
  
    AppLang.Lang["gotolook"] = "去看一看";
    AppLang.Lang["gongxipasschapter"] = "恭喜完成本章学分要求！";
    AppLang.Lang["golook"] = "去看看 >";
    AppLang.Lang["gotologinfirst"] = "前往登录";
    AppLang.Lang["youarenotlogin"] = "您尚未登录";
    AppLang.Lang["loginlizibuycanuseiosandandroiddirectbuyonlycanusethedevice"] = "登录栗子学院购买，可跨平台使用内容，直接购买，可在当前设备使用内容";
    AppLang.Lang["cancelbuy"] = "取消购买";
    AppLang.Lang["confirmbuy"] = "购买确认";
    AppLang.Lang["loginlizixueyuanbuy"] = "登录栗子学院购买";
    AppLang.Lang["visitorbuy"] = "游客身份购买";
    AppLang.Lang["contactus"] = "联系我们";
    AppLang.Lang["contact_email"] = "企业邮箱";
    AppLang.Lang["contact_qq"] = "QQ客服";
    AppLang.Lang["customerservice_tel"] = "电话客服";
    AppLang.Lang["companyoffcialwebsite"] = "公司官网";

    AppLang.Lang["feedback"] = "意见反馈";
    AppLang.Lang["submit"] = "提交";
    AppLang.Lang["pleaseinputyouremail"] = "请输入您的邮箱";
    AppLang.Lang["pleaseinputyourfeedback"] = "请输入您的反馈意见（10～500个字）";
    AppLang.Lang["pleaseinputatleasttenwords"] = "请输入最少10个字反馈意见!";
    AppLang.Lang["pleaseinputcorrectemailaddress"] = "请输入正确的电子邮箱！";
    AppLang.Lang["sendfailedpleasechecknetwork"] = "发送失败，请检查网络！";
    AppLang.Lang["yourfeedbacksuccess"] = "您的反馈已提交！";
    AppLang.Lang["messagecenter"] = "消息中心";
    AppLang.Lang["message"] = "消息";
    AppLang.Lang["notice"] = "通知";
    AppLang.Lang["gotonow"] = "立即前往";
    AppLang.Lang["nomessagerecord"] = "目前还没有消息提示～";

    AppLang.Lang["address"] = "地址";
    AppLang.Lang["phone"] = "电话";
    AppLang.Lang["pleaseinput"] = "请填写";


    AppLang.Lang["operationfailed"] = "操作失败, 请稍后重试!";
    
    AppLang.Lang["updatesuccess"] = "更新成功";
    AppLang.Lang["updatefailed"] = "更新失败";
    AppLang.Lang["other"] = "其他";
 

    AppLang.Lang["commonquestions"] = "常见问题";

    AppLang.Lang["job_type"] = "类别: ";
  
    AppLang.Lang["cancel"] = "取消";
    AppLang.Lang["ok"] = "确认";
    AppLang.Lang["pleaseselectjob_type"] = "请选择所属类别";
    AppLang.Lang["nextpage"] = "下一页";
    AppLang.Lang["lastpage"] = "上一页";
 
    AppLang.Lang["wechat"] = "微信";
    AppLang.Lang["invitingcard"] = "邀请卡";
    AppLang.Lang["pleaseselectshareway"] = "分享至";

    AppLang.Lang["questionanswerreview"] = "问答评论";
    AppLang.Lang["comment"] = "评论";
    AppLang.Lang["writeacomment"] = "写评论...";
    AppLang.Lang["pleaseinputcomments"] = "请输入评论！";

    AppLang.Lang["nodynamic"] = "暂无动态";
    AppLang.Lang["dynamicrecord"] = "动态记录";

    AppLang.Lang["share"] = "分享";
    AppLang.Lang["sharesuccess"] = "分享成功";
    AppLang.Lang["weixin"] = "微信";
    AppLang.Lang["friendgroup"] = "朋友圈";

    AppLang.Lang["presspicandsaveorsendfriend"] = "长按图片，保存或发送给朋友";
 
 
    AppLang.Lang["confirminformation"] = "确认信息";

    AppLang.Lang["noinstallweixin"] = "操作失败, 请稍后重试!"; //"您没有安装微信!"; 不能提示没有安装, 否则APP审核不过

    AppLang.Lang["checkin"] = "签到";

    AppLang.Lang["onekeyshare"] = "一键分享";

    AppLang.Lang["playvideo"] = "播放视频";
    AppLang.Lang["video"] = "视频";
    AppLang.Lang["shang"] = "（上）";
    AppLang.Lang["zhong"] = "（中）";
    AppLang.Lang["xia"] = "（下）";
    AppLang.Lang["goback"] = "返回";
    AppLang.Lang["welcomeregisterliziaccount"] = "欢迎注册栗子学院账号";
    AppLang.Lang["inputyzmoopenlearining"] = "输入验证码用户名完成注册";
    AppLang.Lang["havesendyourmobilenum"] = "已发送至您的手机";
    AppLang.Lang["lizixueyuan"] = "栗子学院";
   
    AppLang.Lang["belongcompanylearningplatform"] = "所属公司";

    AppLang.Lang["zhongzilian"] = "中咨联";
    AppLang.Lang["congratulations"] = "恭喜升级";
    AppLang.Lang["forenvironmentcontinuetofuel"] = "为了美好的环境，要继续加油哟！";
    AppLang.Lang["iknowit"] = "我知道了";
    AppLang.Lang["focusontwodcode"] = "关注二维码";
    AppLang.Lang["givefriend"] = "赠好友";
    AppLang.Lang["givetofriend"] = "赠送好友";
    AppLang.Lang["receivedetail"] = "领取详情";
    AppLang.Lang["receivedetailm"] = "领取详情:";
    AppLang.Lang["buynumberofcopy"] = "购买数量";
    AppLang.Lang["buyforfriend"] = "赠送给好友";
    AppLang.Lang["havegive"] = "已赠送：";
    AppLang.Lang["remaind"] = "剩余："; 
    AppLang.Lang["ge"] = "个";
    AppLang.Lang["pleaseclickrightselectfriends"] = "请点击右上角...,选择-发送给好友或分享到朋友圈，好友点击即可领取。";
    AppLang.Lang["gotoreceive"] = "立即领取";
    AppLang.Lang["receivefailed"] = "领取失败";
    AppLang.Lang["havereceived"] = "已领取";
  

    AppLang.Lang["dearstudent"] = "亲爱的学员";
    AppLang.Lang["hotcourse"] = "热门课程";
    AppLang.Lang["invoice"] = "发票"; 
    AppLang.Lang["payment"] = "支付";
    AppLang.Lang["class"] = "类"; 
    AppLang.Lang["companyname"] = "公司名称";
    AppLang.Lang["asterisk"] = " *";
    AppLang.Lang["cardid"] = "证件号码";
    AppLang.Lang["pleasefillcardid"] = "请填写证件号码";
    AppLang.Lang["invoiceidentifynumbers"] = "识别号";
    AppLang.Lang["receivesemails"] = "收票邮箱"; 
    AppLang.Lang["confirmdownload"] = "确认下载";
    AppLang.Lang["managementcaching"] = "管理缓存";
    AppLang.Lang["mycache"] = "我的缓存";
    AppLang.Lang["cache"] = "缓存"; 
    AppLang.Lang["edit"] = "编辑"; 
    AppLang.Lang["onlineservice"] = "在线客服";
    AppLang.Lang["pleaseinputquestionsofconsultation"] = "请输入您要咨询的问题";
    AppLang.Lang["loading"] = "加载中..."; 
    AppLang.Lang["pullhistoryChat"] = "下拉可以查看历史信息"; 
    AppLang.Lang["welcomeback"] = "欢迎回来，栗子小蜜好想你"; 
    AppLang.Lang["chestnutsmallhoney"] = "栗子小蜜 智能助理"; 
    AppLang.Lang["assistanthoney"] = "助理小蜜进入会话为您服务"; 
    AppLang.Lang["cleverhoneycoming"] = "HI～聪明的小蜜来啦，您可以选择下方热点问题，或用一句话输入您要咨询的问题";
    AppLang.Lang["mightwanttoask"] = "您可能想问："
    AppLang.Lang["pleasedescribetheproblemagain"] = "小蜜不太明白您的意思，请再描述一下问题，我会为您排忧解难哒～";
    AppLang.Lang["nomorenews"] = "没有更多消息了";
    // newAdd
    AppLang.Lang["delete"] = "删除";

    AppLang.Lang["hours"] = "小时";
    AppLang.Lang["minutes"] = "分钟";
    AppLang.Lang["second"] = "秒钟";
    AppLang.Lang["session"] = "场次";
    AppLang.Lang["before"] = "以前";
    AppLang.Lang["just"] = "刚刚";

    AppLang.Lang["myMusicList"] = "我的歌单";
    AppLang.Lang["recentPlay"] = "最近播放";
    AppLang.Lang["newMySongList"] = "新建列表";
    AppLang.Lang["newSong"] = "新歌";
    AppLang.Lang["puppies"] = "排行";

    AppLang.Lang["musiclibrary"] = "乐库";
    AppLang.Lang["playlist"] = "歌单";
    AppLang.Lang["localmusic"] = "本地音乐";
    AppLang.Lang["createnewsonglist"] = "新建歌单";
    AppLang.Lang["songlistnamenotempty"] = "歌单名不能为空"; 
      AppLang.Lang["entertextbeyondlimit"] = "输入文字超过限制"; 
      AppLang.Lang["createfailed"] = "创建失败"; 
      AppLang.Lang["createsuccess"] = "创建成功"; 
      AppLang.Lang["socialaccountlogon"] = "社交账号登录";
  }


  public static SetID(id) {
    AppLang.ID = id;
    AppLang.LangCode = AppLang.ID == 1 ? 'zh-cn' : 'en-us';
  }
  public static ID = 1;
  public static LangCode = 'zh-cn';

}
