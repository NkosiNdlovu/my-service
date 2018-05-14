import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'firebase';
import { Config, Nav, Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { CardsPage } from '../pages/cards/cards';
import { FirstRunPage } from '../pages/pages';
import { RequestHistoryPage } from '../pages/request-history/request-history';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { PostsService } from '../providers/posts-service/posts-service';
import { Settings } from '../providers/providers';
import { MapPage } from '../pages/map/map';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`,
  providers: [PostsService]
})
export class MyApp {
  //rootPage = FirstRunPage;
  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: "Tutorial", component: TutorialPage },
    { title: "Home", component: TabsPage },
    // { title: 'Home', component: HomePage },
    { title: "Request History", component: RequestHistoryPage },
    { title: "Social", component: CardsPage },
    // { title: 'Content', component: ContentPage },
    // { title: 'Login', component: LoginPage },
    // { title: 'Signup', component: SignupPage },
    { title: 'Map', component: MapPage },
    // { title: 'Master Detail', component: ListMasterPage },
    // { title: 'Menu', component: MenuPage },
    { title: "Settings", component: SettingsPage },
    // { title: 'Search', component: SearchPage },
    { title: "Log out", component: WelcomePage }
  ];
  constructor(
    translate: TranslateService,
    platform: Platform,
    settings: Settings,
    config: Config,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    // Set the default language for translation strings, and the current language.

    //check logged in status
    var that = this;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        that.rootPage = TabsPage;
      } else {
        //this.rootPage = LoginPage;
        that.rootPage = FirstRunPage;
      }
    });

    translate.setDefaultLang("en");
    translate.use("en");

    translate.get(["BACK_BUTTON_TEXT"]).subscribe(values => {
      config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
