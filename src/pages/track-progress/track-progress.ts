import { Component, ApplicationRef } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { NavController, LoadingController, ToastController, AlertController } from "ionic-angular";

import { UserService } from "../../providers/users-service/users-service";

@Component({
  selector: "page-track-progress",
  templateUrl: "track-progress.html"
})
export class TrackProgressPage {
  serviceRequests: any;
  userId: string;
  serviceRate: number;
  user: any;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public db: AngularFirestore,
    public userService: UserService,
    private ref: ApplicationRef,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,

  ) {
    this.userId = userService.currentUserId;
    this.serviceRate = 4
  }

  ionViewDidLoad() {
    const that = this;

    this.serviceRequests = this.db
      .collection("/serviceRequests", ref =>
        ref.where("user.id", "==", this.userId)
          .where("status", "==", "PENDING")
          .orderBy("requestDate", "desc").limit(10)

      )
      .valueChanges();
  }

  onRateChange(request, value) {
    setTimeout(() => {
      request.serviceRating = value;
      this.db
        .collection("/serviceRequests")
        .doc(request.id)
        .set(JSON.parse(JSON.stringify(request)))
        .then(res => {

        });
      this.ref.tick();
    }, 100);
  }

  cancelRequest(serviceRequest, event) {

    if (event) {
      event.stopPropagation();
    }

    let confirm = this.alertCtrl.create({
      title: "Are you sure you want to cancel this request?",
      message: "",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            //do nothing
          }
        },
        {
          text: "Yes",
          handler: () => {
            serviceRequest.status = "CANCELLED";

            this.saveRequest(serviceRequest);
          }
        }
      ]
    });
    
    confirm.present();
  }

  saveRequest(serviceRequest) {
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

  getSelectedOptions(serviceRequest) {
    if (!serviceRequest.addedOptions) {
      return "";
    }

    return serviceRequest.addedOptions.map(o => o.name).join(", ");
  }
}
