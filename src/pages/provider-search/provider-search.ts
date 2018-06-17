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
    console.log(this.serviceRequest);
  }

  ionViewDidLoad() {
    this.providers = this.db.collection("/serviceProviders").valueChanges();
  }

  selectProvider(provider) {
    this.serviceRequest.provider = new ServiceProvider();
    this.serviceRequest.provider.id = provider.id;
    this.serviceRequest.provider.name = provider.name;
    console.log(this.serviceRequest);
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
          .orderBy('name')
          .startAt(this.searchText)
          .endAt(this.searchText + "\uf8ff")
      )
      .valueChanges();
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
