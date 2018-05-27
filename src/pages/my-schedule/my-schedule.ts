import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { NavController, NavParams } from 'ionic-angular';

import { CreateSchedulePage } from '../create-schedule/create-schedule';

@Component({
  selector: "page-my-schedule",
  templateUrl: "my-schedule.html"
})
export class MySchedulePage {
  userId: string;

  schedule: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore
  ) {
    let context = this;
    let userRef = this.db.collection("/schedules").doc(this.userId).ref;

    userRef
      .get()
      .then(function(documentSnapshot) {
        if (documentSnapshot.exists) {
          // do something with the data

          context.schedule = documentSnapshot.data();

          console.log(context.schedule);
        } else {
          console.log("document not found");
        }
      })
      .then(function(err) {
        console.log();
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        context.userId = user.uid;
      } else {
        // user is not logged in
        // Redirect TBD
      }
    });
  }

  editSchedule() {
    this.navCtrl.push(CreateSchedulePage);
  }

  createSchedule() {
    this.navCtrl.push(CreateSchedulePage);
  }
}
