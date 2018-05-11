import { ErrorHandler, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2/angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { TimeAgoPipe } from 'time-ago-pipe';

import { Items } from '../mocks/providers/items';
import { AboutPage } from '../pages/about/about';
import { CardsPage } from '../pages/cards/cards';
import { ContactPage } from '../pages/contact/contact';
import { ContentPage } from '../pages/content/content';
import { HomePage } from '../pages/home/home';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ListMasterPage } from '../pages/list-master/list-master';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { RequestHistoryPage } from '../pages/request-history/request-history';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { UserEditPage } from '../pages/user-edit/user-edit';
import { UserViewPage } from '../pages/user-view/user-view';
import { WelcomePage } from '../pages/welcome/welcome';
import { Api } from '../providers/api';
import { LocationTracker } from '../providers/location-tracker';
import { Settings } from '../providers/settings';
import { User } from '../providers/user';
import { MyApp } from './app.component';


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
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
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
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}


/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  MyApp,
  CardsPage,
  UserViewPage,
  UserEditPage,
  HomePage,
  AboutPage,
  ContactPage,
  ContentPage,
  LoginPage,
  MapPage,
  SignupPage,
  TabsPage,
  TutorialPage,
  WelcomePage,
  ListMasterPage,
  ItemDetailPage,
  ItemCreatePage,
  MenuPage,
  SettingsPage,
  SearchPage,
  RequestHistoryPage
];

export function declarations() {
  
  return [MyApp,
  CardsPage,
  UserViewPage,
  UserEditPage,
  HomePage,
  AboutPage,
  ContactPage,
  ContentPage,
  LoginPage,
  MapPage,
  SignupPage,
  TabsPage,
  TutorialPage,
  WelcomePage,
  ListMasterPage,
  ItemDetailPage,
  ItemCreatePage,
  MenuPage,
  SettingsPage,
  SearchPage,
  RequestHistoryPage,
  TimeAgoPipe]
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    LocationTracker,
    User,
    Api,
    Items,
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
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
