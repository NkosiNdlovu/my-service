import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import * as firebase from "firebase";
import { Config, Nav, Platform } from "ionic-angular";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Push, PushObject, PushOptions } from "@ionic-native/push";

import { CardsPage } from "../pages/cards/cards";
import { FirstRunPage, MainPage } from "../pages/pages";
import { RequestHistoryPage } from "../pages/request-history/request-history";
import { SettingsPage } from "../pages/settings/settings";
import { TutorialPage } from "../pages/tutorial/tutorial";
import { WelcomePage } from "../pages/welcome/welcome";
import { PostsService } from "../providers/posts-service/posts-service";
import { Settings } from "../providers/providers";
import { MapPage } from "../pages/map/map";
import { SearchPage } from "../pages/search/search";
import { RequestServicePage } from "../pages/request-service/request-service";

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
  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  options: PushOptions = {
    android: {},
    ios: {
      alert: "true",
      badge: true,
      sound: "false"
    },
    windows: {},
    browser: {
      pushServiceURL: "http://push.api.phonegap.com/v1/push"
    }
  };

  pushObject: PushObject = this.push.init(this.options);

  pages: any[] = [
    { title: "Tutorial", component: TutorialPage },
    { title: "Home", component: SearchPage },
    { title: "Request History", component: RequestHistoryPage },
    { title: "Social", component: CardsPage },
    { title: "Map", component: MapPage },
    { title: "Settings", component: SettingsPage },
    { title: "Log out", component: WelcomePage }
  ];
  constructor(
    private push: Push,
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
        that.nav.setRoot(RequestServicePage);
        // that.rootPage = RequestServicePage;
      } else {
        that.nav.setRoot(FirstRunPage);
        // that.rootPage = FirstRunPage;
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

  checkPermissions() {
    // to check if we have permission
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log("We have permission to send push notifications");
      } else {
        console.log("We do not have permission to send push notifications");
      }
    });
  }

  createChannel() {
    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    this.push
      .createChannel({
        id: "testchannel1",
        description: "My first test channel",
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
      })
      .then(() => console.log("Channel created"));

    // Delete a channel (Android O and above)
    this.push
      .deleteChannel("testchannel1")
      .then(() => console.log("Channel deleted"));

    // Return a list of currently configured channels
    this.push
      .listChannels()
      .then(channels => console.log("List of channels", channels));
  }

  // to initialize push notifications

  // pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

  // pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

  // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
}
