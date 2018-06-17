import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActionSheetController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

import { ServiceRequest } from '../../models/serviceRequest';
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
    public navParams: NavParams,
    public db: AngularFirestore,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController
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
