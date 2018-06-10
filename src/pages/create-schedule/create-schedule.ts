import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActionSheetController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

import { Schedule } from '../../models/schedule';
import { UserService } from '../../providers/users-service/users-service';
import { MySchedulePage } from '../my-schedule/my-schedule';

@Component({
  selector: "page-create-schedule",
  templateUrl: "create-schedule.html"
})
export class CreateSchedulePage {
  schedule = new Schedule();

  userId: string;

  allowedHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public db: AngularFirestore,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
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

        } else {
          console.log("document not found");
        }
      })
      .then(function(err) {
        console.log();
      });
  }

  selectWeekFrequency() {
    let actionButtons = [];
    let frequency = [2, 3, 4];
    let context = this;

    actionButtons.push({
      text: "Every week",
      role: "destructive",
      handler: () => {
        context.schedule.weeklyFrequency = 1;
      }
    });

    frequency.forEach(x => {
      actionButtons.push({
        text: "Every " + x + " weeks",
        role: "destructive",
        handler: () => {
          context.schedule.weeklyFrequency = x;
        }
      });
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: "Select schedule frequency",
      buttons: actionButtons
    });

    actionSheet.present();
  }

  selectDays() {
    let actionButtons = [];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ];
    let context = this;

    days.forEach(x => {
      actionButtons.push({
        text:  x + "s",
        role: "destructive",
        handler: () => {
          context.schedule.day = x;
        }
      });
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: "Select schedule frequency",
      buttons: actionButtons
    });

    actionSheet.present();
  }

  selectStartTime() {
    let context = this;
    let actionButtons = [];

    this.allowedHours.forEach(hour => {
      actionButtons.push({
        text: hour + " 00h",
        role: "destructive",
        handler: () => {
          context.schedule.timeRangeStart = hour;
        }
      });
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: "Select availability start time",
      buttons: actionButtons
    });
    actionSheet.present();
  }

  selectEndTime() {
    let context = this;
    let actionButtons = [];

    this.allowedHours.forEach(hour => {
      if (context.schedule.timeRangeStart < hour) {
        actionButtons.push({
          text: hour + " 00h",
          role: "destructive",
          handler: () => {
            context.schedule.timeRangeEnd = hour;
          }
        });
      }
    });

    // Show action sheet
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select availability end time",
      buttons: actionButtons
    });
    actionSheet.present();
  }

  saveSchedule() {
    if (!this.userId) {
      return;
    }
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
}
