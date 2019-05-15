import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ServiceSelectionPage } from '../service-selection/service-selection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  requestCarWash(){
    this.navCtrl.setRoot(ServiceSelectionPage);
  }
}
