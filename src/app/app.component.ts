import { ApplicationRef, Component, ViewChild } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'firebase';
import { AlertController, Config, Nav, Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { UserAccount } from '../models/account';
import { PageModel } from '../models/page';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MyJobCardsPage } from '../pages/my-job-cards/my-job-cards';
import { MySchedulePage } from '../pages/my-schedule/my-schedule';
import { RequestHistoryPage } from '../pages/request-history/request-history';
import { RequestServicePage } from '../pages/request-service/request-service';
import { TrackProgressPage } from '../pages/track-progress/track-progress';
import { UserListPage } from '../pages/user-list/user-list';
import { UserViewPage } from '../pages/user-view/user-view';
import { WelcomePage } from '../pages/welcome/welcome';
import { Notifications } from '../providers/notifications';
import { PostsService } from '../providers/posts-service/posts-service';
import { UserService } from '../providers/users-service/users-service';
import { FcmWashProvider } from '../providers/fcm/fcm';
import { FCM } from '@ionic-native/fcm';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: "app.html",
  providers: [PostsService]
})
export class MyApp {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  currentUser: UserAccount;
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

  pages: PageModel[] = [
    {
      title: "Home",
      icon: "ios-home-outline",
      component: HomePage,
      roles: { user: true, provider: false, admin: false }
    },
    {
      title: "Schedule",
      icon: "ios-alarm-outline",
      component: MySchedulePage,
      roles: { user: true, provider: false, admin: false }
    },
    {
      title: "Request History",
      icon: "ios-apps-outline",
      component: RequestHistoryPage,
      roles: { user: false, provider: false, admin: true }
    },
    {
      title: "Track progress",
      icon: "ios-apps-outline",
      component: TrackProgressPage,
      roles: { user: true, provider: false, admin: false }
    },
    {
      title: "My Job cards",
      icon: "ios-card-outline",
      component: MyJobCardsPage,
      roles: { user: false, provider: true, admin: false }
    },
    // {
    //   title: "Social",
    //   icon: "logo-twitter",
    //   component: CardsPage,
    //   roles: { user: true, provider: true, admin: true }
    // },
    {
      title: "Admin Map",
      icon: "ios-navigate-outline",
      component: MapPage,
      roles: { user: false, provider: false, admin: true }
    },
    {
      title: "Users",
      icon: "ios-contact-outline",
      component: UserListPage,
      roles: { user: false, provider: false, admin: true }
    },
    {
      title: "My Profile",
      icon: "ios-contact-outline",
      component: UserViewPage,
      roles: { user: true, provider: true, admin: true }
    },
    // {
    //   title: "Settings",
    //   icon: "ios-settings-outline",
    //   component: SettingsPage,
    //   roles: { user: false, provider: false, admin: true }
    // }
  ];

  loading = true;
  userLoggedIn = false;

  constructor(
    private push: Push,

    translate: TranslateService,
    platform: Platform,
    config: Config,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public userService: UserService,
    public alertCtrl: AlertController,
    private ref: ApplicationRef,
    private notifications: Notifications,
    private fcm: FcmWashProvider,
    private db: AngularFirestore
  ) {
    // Set the default language for translation strings, and the current language.

    //check logged in status
    var that = this;

    this.userService.currentUser$.subscribe(user => {
      if (user) {
        that.currentUser = user;
        that.loading = false;
        // Force Change Detection in Angular
        that.ref.tick();
      }
    });

    let unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {

      if (user) {
        
        that.db.collection("profiles").doc(user.uid).valueChanges().subscribe(
          profile => {
            that.fcm.getToken(profile);
          }
        );

        this.userService.currentUserId = user.uid;
        this.userLoggedIn = true;
        this.notifications.trackNotifications(user.uid);
        that.nav.setRoot(RequestServicePage);

      } else {
        if (!that.currentUser) {
          // system loading for the first time
          that.nav.setRoot(HomePage);
        } else {
          // log off
          that.nav.setRoot(LoginPage);
          that.currentUser = null;
        }
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

  isPageAccessible(page: PageModel) {

    if (!this.currentUser || !this.currentUser.roles) {
      return false;
    }

    return (
      (this.currentUser.roles.user && page.roles.user) ||
      (this.currentUser.roles.provider && page.roles.provider) ||
      (this.currentUser.roles.admin && page.roles.admin)
    );
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

  login() {
    //show toast before redirecting
    this.nav.push(LoginPage);
  }

  signUp() {
    this.nav.setRoot(
      WelcomePage,
      {},
      {
        animate: true,
        direction: "forward"
      }
    );
  }

  logUserOut() {
    //pop to confirm if user really wishes to logout
    let context = this;

    let confirm = this.alertCtrl.create({
      title: "Are you sure you want to logout?",
      message: "",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            //do nothing
          }
        },
        {
          text: "Yes",
          handler: () => {
            //call user logout service
            context.userService.logoutUser().then(() => {
              //show toast before redirecting
              this.nav.setRoot(LoginPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }
  // to initialize push notifications

  // pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

  // pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

  // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
}
