import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController } from 'ionic-angular';

import { UserService } from '../../providers/users-service/users-service';


@Component({
  selector: 'page-track-progress',
  templateUrl: 'track-progress.html',
})
export class TrackProgressPage {
  serviceRequests: any
  userId: string;
  constructor(
    public navCtrl: NavController,
    public db: AngularFirestore,
    public userService: UserService
  ) {

    this.userId = userService.currentUserId;
  }

  ionViewDidLoad() {
    this.serviceRequests = this.db
      .collection("/serviceRequests", ref =>
        ref.where("user.id", "==", this.userId)
      )
      .valueChanges()
  }
}
