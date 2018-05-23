import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { ServiceRequest } from '../../models/serviceRequest';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-request-history',
  templateUrl: 'request-history.html',
})
export class RequestHistoryPage {

  serviceRequests = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,

    public db: AngularFirestore,) {

    db.collection('/serviceRequests').valueChanges().subscribe((data) => {
      this.serviceRequests = data;
      console.log(data);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestHistoryPage');
  }

  openMap(request){

    this.navCtrl.push(MapPage, {
      data: request
    });

  }

}
