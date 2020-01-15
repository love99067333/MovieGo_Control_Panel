import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ProviderService } from './service/provider.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  

  logined:boolean=false;
  public appPages = [
    {
      title: '主頁面',
      url: '/home',
      icon: 'home',
      show: true
    },
    {
      title: '帳戶管理',
      url: '/account',
      icon: 'people',
    },/*{
      title: '電影管理',
      url: '/movie',
      icon: 'play'
    },*/
    {
      title: '場次管理',
      url: '/cinema',
      icon: 'md-easel',      
    },
    {
      title: '設定',
      url: '/profile',
      icon: 'md-settings',     
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
}
