import { RequestServicePage } from './../request-service/request-service';
import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

import { ServiceProvider } from '../../models/serviceProvider';
import { ServiceRequest } from '../../models/serviceRequest';
import { MapPage } from '../map/map';
import { RequestProvider } from '../../providers/request/request-provider';

@IonicPage()
@Component({
  selector: 'page-car-wash-station-selection',
  templateUrl: 'car-wash-station-selection.html',
})
export class CarWashStationSelectionPage {
  searchText: string;
  serviceRequest: ServiceRequest;
  providers: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    public loadingCtrl: LoadingController,
    public requestProvider: RequestProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

    this.providers = this.db.collection("/serviceProviders", ref =>
      ref.where('isMobile', '==', false)).valueChanges();
  }

  selectProvider(provider) {
    this.serviceRequest = new ServiceRequest();
    this.serviceRequest.provider = new ServiceProvider();
    this.serviceRequest.providerId = provider.id;
    this.serviceRequest.provider.id = provider.id;
    this.serviceRequest.provider.firstName = provider.firstName;
    this.serviceRequest.provider.lastName = provider.lastName;
    this.requestProvider.currentServiceRequest = this.serviceRequest;
    this.navCtrl.setRoot(RequestServicePage);
  }

  openMap(provider) {
    this.navCtrl.push(MapPage, {
      serviceRequests: [provider]
    });
  }

  onSearchInput(event) {
    this.providers = this.db
      .collection("/serviceProviders", ref =>
        ref
          .orderBy("firstName")
          .startAt(this.searchText)
          .endAt(this.searchText + "\uf8ff")
          .where('isMobile', '==', false)
      )
      .valueChanges();
  }

  getStraightLineDistance(provider) {
    return 0;

    // if (provider.workingLocation && this.serviceRequest.location) {
    //   return this.calcCrow(
    //     provider.workingLocation.latitude,
    //     provider.workingLocation.longitude,
    //     this.serviceRequest.location.latitude,
    //     this.serviceRequest.location.longitude
    //   );
    // } else {
    //   return -1;
    // }
  }

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  onSearchCancel(event) { }
}
