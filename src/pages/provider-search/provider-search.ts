import { Component } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import {
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { ServiceProvider } from "../../models/serviceProvider";
import { ServiceRequest } from "../../models/serviceRequest";
import { MapPage } from "../map/map";
import { RequestHistoryPage } from "../request-history/request-history";

// @IonicPage()
@Component({
  selector: "page-provider-search",
  templateUrl: "provider-search.html"
})
export class ProviderSearchPage {
  searchText: string;
  serviceRequest: ServiceRequest;
  providers: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.serviceRequest = navParams.get("serviceRequest");
  }

  ionViewDidLoad() {
    this.providers = this.db.collection("/serviceProviders").valueChanges();
  }

  selectProvider(provider) {
    this.serviceRequest.provider = new ServiceProvider();
    this.serviceRequest.provider.id = provider.id;
    this.serviceRequest.provider.firstName = provider.firstName;
    this.serviceRequest.provider.lastName = provider.lastName;
    this.saveRequest(this.serviceRequest);
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
      )
      .valueChanges();
  }

  getStraightLineDistance(provider) {

    if (provider.workingLocation && this.serviceRequest.location) {
      return this.calcCrow(
        provider.workingLocation.latitude,
        provider.workingLocation.longitude,
        this.serviceRequest.location.latitude,
        this.serviceRequest.location.longitude
      );
    } else {
      return -1;
    }
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

  onSearchCancel(event) {}

  saveRequest(serviceRequest) {
    let that = this;
    var loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.db
      .collection("/serviceRequests")
      .doc(serviceRequest.id)
      .set(JSON.parse(JSON.stringify(serviceRequest)))
      .then(
        res => {
          // successful
          loader.dismiss();
          this.navCtrl.setRoot(RequestHistoryPage);
        },
        error => {
          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: "Error occurred",
            duration: 3000,
            position: "top"
          });
          toast.present();
        }
      );
  }
}
