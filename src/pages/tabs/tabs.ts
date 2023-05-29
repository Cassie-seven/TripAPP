import { Component,ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { BackButtonService } from "../../services/backButton.service";
import { Platform, Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  

  constructor(public backButtonService: BackButtonService,
    private platform: Platform) {
      this.platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
  }
}
