import { ErrorHandler, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePicker } from '@ionic-native/date-picker';
import { Firebase } from '@ionic-native/firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { Push } from '@ionic-native/push';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicRatingModule } from 'ionic-rating';
import { IonicStepperModule } from 'ionic-stepper';
import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AboutPage } from '../pages/about/about';
import { AddressSearchPage } from '../pages/address-search/address-search';
import { CarWashOptionsPage } from '../pages/car-wash-options/car-wash-options';
import { CarWashStationSelectionPageModule } from '../pages/car-wash-station-selection/car-wash-station-selection.module';
import { CardsPage } from '../pages/cards/cards';
import { ContactPage } from '../pages/contact/contact';
import { ContentPage } from '../pages/content/content';
import { CreateSchedulePage } from '../pages/create-schedule/create-schedule';
import { HomePage } from '../pages/home/home';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ListMasterPage } from '../pages/list-master/list-master';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { MyJobCardsPage } from '../pages/my-job-cards/my-job-cards';
import { MySchedulePage } from '../pages/my-schedule/my-schedule';
import { ProviderSearchPage } from '../pages/provider-search/provider-search';
import { RequestHistoryPage } from '../pages/request-history/request-history';
import { RequestServicePage } from '../pages/request-service/request-service';
import { SearchPage } from '../pages/search/search';
import { ServiceSelectionPageModule } from '../pages/service-selection/service-selection.module';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TrackProgressPage } from '../pages/track-progress/track-progress';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { UserCreatePage } from '../pages/user-create/user-create';
import { UserListPage } from '../pages/user-list/user-list';
import { UserEditPage } from '../pages/user-profile-edit/user-edit';
import { UserViewPage } from '../pages/user-view/user-view';
import { WelcomePage } from '../pages/welcome/welcome';
import { Api } from '../providers/api';
import { FcmWashProvider } from '../providers/fcm/fcm';
import { LocationTracker } from '../providers/location-tracker';
import { Notifications } from '../providers/notifications';
import { RequestProvider } from '../providers/request/request-provider';
import { Settings } from '../providers/settings';
import { User } from '../providers/user';
import { UserService } from '../providers/users-service/users-service';
import { MyApp } from './app.component';
import { RequestCountDownPage } from '../pages/request-count-down/request-count-down';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBME_NQg_eb3tG9T-wmnXOp5MtoLCD5nZQ",
  authDomain: "service-24-6.firebaseapp.com",
  databaseURL: "https://service-24-6.firebaseio.com",
  projectId: "service-24-6",
  storageBucket: "service-24-6.appspot.com",
  messagingSenderId: "81758531362"
};

firebase.initializeApp(firebaseConfig);

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, "./assets/i18n", ".json");
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: "Ionitron J. Framework",
    option3: "3",
    option4: "Hello"
  });
}

/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  MyApp,
  HomePage,
  MySchedulePage,
  CreateSchedulePage,
  ProviderSearchPage,
  RequestServicePage,
  AddressSearchPage,
  CarWashOptionsPage,
  TrackProgressPage,
  MyJobCardsPage,
  CardsPage,
  UserViewPage,
  UserEditPage,
  UserListPage,
  UserCreatePage,
  HomePage,
  AboutPage,
  ContactPage,
  ContentPage,
  LoginPage,
  MapPage,
  SignupPage,
  TutorialPage,
  WelcomePage,
  ListMasterPage,
  ItemDetailPage,
  ItemCreatePage,
  MenuPage,
  SettingsPage,
  SearchPage,
  RequestHistoryPage,
  RequestCountDownPage
];

export function declarations() {
  return [
    MyApp,
    HomePage,
    ProviderSearchPage,
    RequestServicePage,
    MyJobCardsPage,
    AddressSearchPage,
    CarWashOptionsPage,
    TrackProgressPage,
    CardsPage,
    UserViewPage,
    UserEditPage,
    UserListPage,
    UserCreatePage,
    HomePage,
    AboutPage,
    ContactPage,
    ContentPage,
    LoginPage,
    MapPage,
    SignupPage,
    TutorialPage,
    WelcomePage,
    ListMasterPage,
    ItemDetailPage,
    ItemCreatePage,
    MenuPage,
    SettingsPage,
    SearchPage,
    RequestHistoryPage,
    TimeAgoPipe,
    MySchedulePage,
    CreateSchedulePage,
    RequestCountDownPage
  ];
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    FcmWashProvider,
    Firebase,
    Push,
    Geolocation,
    PhonegapLocalNotification,
    Notifications,
    LocationTracker,
    User,
    UserService,
    RequestProvider,
    Api,
    DatePicker,
    StatusBar,
    SplashScreen,
    AngularFirestoreModule,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    BrowserModule,
    ServiceSelectionPageModule,
    CarWashStationSelectionPageModule,
    BrowserAnimationsModule,
    IonicRatingModule ,
    AngularFirestoreModule,
    IonicStepperModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
