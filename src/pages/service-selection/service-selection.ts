import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RequestServicePage } from '../request-service/request-service';
import { CarWashStationSelectionPage } from './../car-wash-station-selection/car-wash-station-selection';


@IonicPage()
@Component({
  selector: 'page-service-selection',
  templateUrl: 'service-selection.html',
})
export class ServiceSelectionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceSelectionPage');
  }

  
  requestCarWash(){
    this.navCtrl.setRoot(RequestServicePage);
  }
  
  goToNearestCarWash(){
    this.navCtrl.setRoot(CarWashStationSelectionPage);
  }
}
