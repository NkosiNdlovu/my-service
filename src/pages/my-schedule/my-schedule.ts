import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Schedule } from '../../models/schedule';
import { UserService } from '../../providers/users-service/users-service';
import { CreateSchedulePage } from '../create-schedule/create-schedule';

@Component({
  selector: "page-my-schedule",
  templateUrl: "my-schedule.html"
})
export class MySchedulePage {
  userId: string;

  schedule: Schedule;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,

  ) {
    let context = this;
    this.userId = userService.currentUserId;

  }


  ionViewDidLoad() {
    let that = this;

    let userRef = this.db.collection("/schedules").doc(this.userId).ref;

    userRef
      .get()
      .then(function(documentSnapshot: any) {
        if (documentSnapshot.exists) {
          // do something with the data

          that.schedule = documentSnapshot.data();

        } else {
          console.log("document not found");
        }
      })
      .then(function(err) {
        console.log(err);
      });
  }
  editSchedule() {
    this.navCtrl.push(CreateSchedulePage);
  }

  createSchedule() {
    this.navCtrl.push(CreateSchedulePage);
  }


  pauseSchedule() {

    this.schedule.isPaused = !this.schedule.isPaused;
    let that = this;
    var loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.db
      .collection("/schedules")
      .doc(this.userId)
      .set(JSON.parse(JSON.stringify(this.schedule)))
      .then(res => {

        // successful
      loader.dismiss();
      that.navCtrl.setRoot(MySchedulePage);
      }, error => {
        loader.dismiss();
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: "Error occurred",
          duration: 3000,
          position: 'top'
        });
        toast.present();

      });
  }

  cancelSchedule(){

  }
}
