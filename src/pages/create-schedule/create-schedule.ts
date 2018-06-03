import { Component } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase";
import { ActionSheetController, NavController, NavParams } from "ionic-angular";
import { UserService } from "../../providers/users-service/users-service";
import { Schedule } from "../../models/schedule";

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

    this.db
      .collection("/schedules")
      .doc(this.userId)
      .set(JSON.parse(JSON.stringify(this.schedule)))
      .then(res => {});
  }
}
