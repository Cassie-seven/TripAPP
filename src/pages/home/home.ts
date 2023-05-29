import { Component,ViewChild } from '@angular/core';
import { NavController,ModalController,LoadingController,ToastController,Slides } from 'ionic-angular';
import { CaseDetailsPage } from "../case-details/case-details";
import { CaseListApi } from '../../providers/caselist.api';
import {ApiConfig} from '../../app/api.config';

declare var BMap;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CaseListApi]
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;
  segmentsArray = [
    'segmentOne','segmentTwo','segmentThree','segmentFour','segmentFive'
  ];
  mapData = [
    {
      cssname: '1',
      position: '深圳市宝安区沙井街道办新三阳工业区境正江大五金塑料有限公司'
    },
    {
      cssname: '2',
      position: '深圳市八卦一路'
    },
    {
      cssname: '3',
      position: '深圳市宝安农批市场公交站'
    }
  ]
  maphData = [
    {
      cssname: 'four',
      position: '深圳市上步中学'
    }
  ]
  mapuData = [
    {
      cssname: 'five',
      position: '深圳市八卦一路'
    },
    {
      cssname: 'six',
      position: '深圳市宝安农批市场公交站'
    }
  ]
  mapeData = []
  datalist = [];
  ingDataList = [];
  ningDataList = [];
  endDataList = [];
  outDataList = [];
  segmentModel: string = this.segmentsArray[2];
  status: string = '';
  public loading: any;
  allDataCount: 0;
  ingDataCount: 0;
  ningDataCount: 0;
  endDataCount: 0;
  outDataCount: 0;
  area = "";
  uname ="";
  seclectedCountry = "";
  selectedValue = "";
  country= [
    {
      title: '全部',
      value:''
    },
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
      title: '拒绝还款',
      value:'redResult-third-JJHK'
    },
    {
      title: '无法转告',
      value:'redResult-third-WWZG'
    },
    {
      title: '不愿转告',
      value:'redResult-third-BYZG'
    }
  ];
  carouselImgList = [
    {
      imgUrl: 'assets/imgs/banner1.jpg'
    },
    {
      imgUrl: 'assets/imgs/banner2.jpg'
    },
    {
      imgUrl: 'assets/imgs/banner3.jpg'
    }
  ];
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public modalCtrl: ModalController,public toastCtrl: ToastController,public caselistApi: CaseListApi) {
      // this.getAllData() 
      this.getNingData();           
  }

  autoPlay() {
    console.log(1)
    this.slides.startAutoplay();
  }

  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }

  async selectNumber(num) {
    this.seclectedCountry = num.title;
    this.selectedValue = num.value;
    await this.loadAllData(this.status,true);
  }

  async filterItems(ev: any) {
    this.area = ev.target.value;
    await this.loadAllData(this.status,false);
  }

  async loadData() {
    // for (var i = 0; i < this.datalist.length; i++) {        
    //   // 百度地图API功能
    //   await this.drawMap(this.datalist[i].case_id,this.datalist[i].adress)
    // }  
  }

  async loadIngData() {
    // for (var i = 0; i < this.ingDataList.length; i++) {        
    //   // 百度地图API功能
    //   await this.drawMap(this.ingDataList[i].case_id,this.ingDataList[i].adress)
    // }  
  }
  async loadNingData() {
    // for (var i = 0; i < this.ningDataList.length; i++) {        
    //   // 百度地图API功能
    //   await this.drawMap(this.ningDataList[i].case_id,this.ningDataList[i].adress)
    // }  
  }
  async loadEndData() {
    // for (var i = 0; i < this.endDataList.length; i++) {        
    //   // 百度地图API功能
    //   await this.drawMap(this.endDataList[i].case_id,this.endDataList[i].adress)
    // }  
  }
  
  async drawMap(name,position) {
    var map = new BMap.Map(name);
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    map.disableDragging();//禁止拖拽
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
     myGeo.getPoint(position, function(point){
      if (point) {
        map.centerAndZoom(point, 14);
        map.addOverlay(new BMap.Marker(point));
      }else{
        alert("您选择地址没有解析到结果!");
      }
    }, "深圳市");
    
  }
  show() {
    this.loading = this.loadingCtrl.create({
      content: '数据拼命加载中...'
    });
    this.loading.present();
  }
  // 隐藏loading
  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  async ionViewDidLoad() {  
    this.uname = window.localStorage.getItem('login_name');
  }

  ionViewDidEnter() {

    this.slides.autoplayDisableOnInteraction = false;
    
  }
  
doInfinite(infiniteScroll){
  console.log(infiniteScroll);

   infiniteScroll.complete();  
}
doInfinites(event) {
  setTimeout(() => {
    console.log('Done');
    event.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if ( this.datalist.length == 1000) {
      event.target.disabled = true;
    }
  }, 500);
}

// toggleInfiniteScroll() {
//   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
// }

  async loadAllData(status,isDialog) {
    this.status = status;
    //加载数据列表
    let postData = { status: this.status,member_id : ApiConfig.RID,searchOverdue:'false',area: this.area,result:this.seclectedCountry };
    if(isDialog) {
      this.show();
    }   
    this.caselistApi.getcaselist(postData).then(result => {   
      if (result.code == 0 && result.data != null) {    
        if(status == '') {         
          this.datalist = result.data.list;          
        }  
        if(status == 'B') {  
            this.ingDataList = result.data.list;  
            this.ingDataCount = result.data.count;                  
        }     
        if(status == 'A') {  
            this.ningDataList = result.data.list;         
            this.ningDataCount = result.data.count;          
        }  
        if(status == 'C') {  
            this.endDataList = result.data.list; 
            this.endDataCount = result.data.count;              
        }
        if(status == 'D') {  
          this.outDataList = result.data.list; 
          this.outDataCount = result.data.count;              
        }   
        if(isDialog) {
          this.hide();  
        }  
        this.allDataCount = result.data.count; 
        this.ingDataCount = result.data.ing_count; 
        this.ningDataCount = result.data.ning_count; 
        this.endDataCount = result.data.end_count;
        this.outDataCount = result.data.out_count;           
      }
      else {
        if(result.code == 1) {
          this.endDataList = [];
          this.hide();  
          return;
        }
        if(isDialog) {
          this.hide();  
        }  
        this.msgAlter("数据加载失败", this.toastCtrl,'loginout'); 
        return;
      }
    }).catch(err => {
      this.msgAlter("获取案件列表请求异常 请检查网络设置或联系管理员", this.toastCtrl,'error');
      if(isDialog) {
        this.hide();  
      }  
      return;
    });
  }

  async ionViewWillEnter() {
    await this.loadData()
  }

  swipeEvents(e) {
    
    this.autoPlay();
    
  }
  
  swipeEvent(event){
    //向左滑
    if(event.direction==2){
      if(this.segmentsArray.indexOf(this.segmentModel)<2){
    this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)+1];
      }
    }
    //向右滑
    if(event.direction==4){
      if(this.segmentsArray.indexOf(this.segmentModel)>0){
    this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)-1];
      }
    }
  }
  //前往案件详情页面
  goToDetails(data) {
      // if(data.status == 'C') {
      //   this.msgAlter("此案件已经结束", this.toastCtrl,'loginout'); 
      //   return;
      // }
      // 界面跳转
      let modal = this.modalCtrl.create(CaseDetailsPage,data);
      modal.present();
      this.loading.dismiss();
  }
  //下拉刷型界面
  refreshStart(refresher) {
    
  }

  public msgAlter(msg: string, toastCtrl,status: string) {
    let msgpop = toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: status
    });
    msgpop.present();   
  }

  async doRefresh(refresher) { 
    if(this.status == '') {
      await this.getAllData();
    }
    if(this.status == 'B') {
      await this.getIngData();
    }
    if(this.status == 'A') {
      await this.getNingData();
    }
    if(this.status == 'C') {
      await this.getEndData();
    }
    refresher.complete();
  }

  async getAllData () {
    await this.loadAllData('',true)
    let that = this;
    let TIME_IN_MS = 100;
    setTimeout( () => {
      that.loadData()
    }, TIME_IN_MS);  
  }

  async getIngData() {
    this.endDataList = [];
    this.seclectedCountry = "";
    await this.loadAllData('B',true)
    let that = this;
    let TIME_IN_MS = 100;
    setTimeout( () => {
      that.loadIngData()
    }, TIME_IN_MS);  
  }

  async getNingData() {
    this.endDataList = [];
    this.seclectedCountry = "";
    await this.loadAllData('A',true)
    let that = this;
    let TIME_IN_MS = 100;
    setTimeout( () => {
      that.loadNingData()
    }, TIME_IN_MS);  
  }

  async getEndData() {
    await this.loadAllData('C',true)
    let that = this;
    let TIME_IN_MS = 100;
    setTimeout( () => {
      that.loadEndData()
    }, TIME_IN_MS);  
  }
  async getOutData() {
    this.endDataList = [];
    this.seclectedCountry = "";
    await this.loadAllData('D',true)
    let that = this;
    let TIME_IN_MS = 100;
    setTimeout( () => {
      that.loadEndData()
    }, TIME_IN_MS);  
  }
}
