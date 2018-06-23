import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActionSheetController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

import { ServiceRequest } from '../../models/serviceRequest';
import { UserService } from '../../providers/users-service/users-service';
import { MapPage } from '../map/map';
import { ProviderSearchPage } from '../provider-search/provider-search';

@Component({
  selector: "page-request-history",
  templateUrl: "request-history.html"
})
export class RequestHistoryPage {
  userId: string;

  serviceRequests: Array<ServiceRequest>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public db: AngularFirestore
  ) {
    this.serviceRequests = [];

    this.userId = userService.currentUserId;
  }

  ionViewDidLoad() {
    this.db
      .collection("/serviceRequests")
      .valueChanges()
      .subscribe((data: Array<ServiceRequest>) => {
        this.serviceRequests = data;
        console.log(data);
      });
  }

  openMap(serviceRequest) {
    this.navCtrl.push(MapPage, {
      serviceRequests: [serviceRequest]
    });
  }

  loadAction(serviceRequest) {
    const that = this;

    let actionButtons = [];
    if (!serviceRequest.acknowledgeDBy) {
      actionButtons.push({
        text: "Acknowledge Request",
        role: "destructive",
        handler: () => {
          that.ackRequest(serviceRequest);
        }
      });
    }

    actionButtons.push({
      text: "View on map",
      role: "destructive",
      handler: () => {
        that.openMap(serviceRequest);
      }
    });

    actionButtons.push({
      text: "Assign to provider",
      role: "destructive",
      handler: () => {
        that.assignToProvider(serviceRequest);
      }
    });

    actionButtons.push({
      text: "Re-assign to provider",
      role: "destructive",
      handler: () => {
        that.assignToProvider(serviceRequest);
      }
    });

    actionButtons.push({
      text: "Call Customer",
      role: "destructive",
      handler: () => {
        that.callCustomer(serviceRequest);
      }
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: "Actions",
      buttons: actionButtons
    });
    actionSheet.present();
  }
  ackRequest(serviceRequest) {
    serviceRequest.acknowledgedBy = this.userId;

    this.saveRequest(serviceRequest);
  }

  callCustomer(serviceRequest) {
    // Use the call API
  }

  assignToProvider(serviceRequest) {
    // open search bar
    this.navCtrl.push(ProviderSearchPage, { serviceRequest: serviceRequest });
  }

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
