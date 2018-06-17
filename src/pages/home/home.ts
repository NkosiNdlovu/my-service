import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RequestServicePage } from '../request-service/request-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  requestCarWash(){
    this.navCtrl.setRoot(RequestServicePage);
  }
}
