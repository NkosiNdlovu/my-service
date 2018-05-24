import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController
} from "ionic-angular";
import { Schedule } from "../../models/schedule";

@Component({
  selector: "page-create-schedule",
  templateUrl: "create-schedule.html"
})
export class CreateSchedulePage {
  schedule = new Schedule();

  allowedHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateSchedulePage");
  }

  selectWeekFrequency() {
    let actionButtons = [];
    let frequency = [2,3,4];
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
        text: "Every "+ x +" weeks",
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
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
    let context = this;

    days.forEach(x => {

      actionButtons.push({
        text: "Every "+ x +" weeks",
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
          context.bookingTimeRangeStart = hour;
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
      if (context.bookingTimeRangeStart > hour) {
        actionButtons.push({
          text: hour + " 00h",
          role: "destructive",
          handler: () => {
            context.bookingTimeRangeEnd = hour;
          }
        });
      }
    });

}
