import { Component, ApplicationRef } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { NavController } from "ionic-angular";

import { UserService } from "../../providers/users-service/users-service";

@Component({
  selector: "page-track-progress",
  templateUrl: "track-progress.html"
})
export class TrackProgressPage {
  serviceRequests: any;
  userId: string;
  serviceRate:number;
  user: any;

  constructor(
    public navCtrl: NavController,
    public db: AngularFirestore,
    public userService: UserService,
    private ref: ApplicationRef

  ) {
    this.userId = userService.currentUserId;
    this.serviceRate = 4
  }

  ionViewDidLoad() {
    const that = this;

    this.serviceRequests = this.db
      .collection("/serviceRequests", ref =>
        ref.where("user.id", "==", this.userId)
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
}
