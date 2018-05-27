import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController, NavParams } from 'ionic-angular';

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
    public userService: UserService

  ) {
    let context = this;
    this.userId = userService.currentUserId;
    let userRef = this.db.collection("/schedules").doc(this.userId).ref;

    userRef
      .get()
      .then(function(documentSnapshot: any) {
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
  }

  editSchedule() {
    this.navCtrl.push(CreateSchedulePage);
  }

  createSchedule() {
    this.navCtrl.push(CreateSchedulePage);
  }

  cancelSchedule(){

  }
  pauseSchedule(){

  }
}
