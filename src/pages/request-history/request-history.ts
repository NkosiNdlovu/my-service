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

  serviceRequests : Array<ServiceRequest>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,

    public db: AngularFirestore,) {

      this.serviceRequests = [];
  }

  ionViewDidLoad() {
    this.db.collection('/serviceRequests').valueChanges().subscribe((data: Array<ServiceRequest>) => {
      this.serviceRequests = data;
      console.log(data);
    });
  }

  openMap(serviceRequest){

    this.navCtrl.push(MapPage, {
      serviceRequests: [serviceRequest]
    });

  }
}
