import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

import { TranslateService } from 'ng2-translate/ng2-translate';



export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService) {
    translate.get(["TUTORIAL_SLIDE1_TITLE",
                   "TUTORIAL_SLIDE1_DESCRIPTION",
                   "TUTORIAL_SLIDE2_TITLE",
                   "TUTORIAL_SLIDE2_DESCRIPTION",
                   "TUTORIAL_SLIDE3_TITLE",
                   "TUTORIAL_SLIDE3_DESCRIPTION",
    ])
    .subscribe((values) => {
      console.log('Loaded values', values);
      this.slides = [
        {
          title: 'Welcome to Service-24-6!',
          description: 'Service-24-6 helps you discover service providers.',
          image: 'assets/img/ica-slidebox-img-1.png',
        },
        {
          title: 'Search and Discover Service providers around you!' ,
          description: 'Service-24-6 uses informative maps to inform you of service providers around',
          image: 'assets/img/ica-slidebox-img-2.png',
        },
        {
          title: 'Service-24-6 connects you',
          description: 'This is one of the best apps in the world in the service industry',
          image: 'assets/img/ica-slidebox-img-3.png',
        }
      ];
    });
  }

  startApp() {
    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
