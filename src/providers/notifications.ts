import "rxjs/add/operator/map";

import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { ServiceRequest } from "../models/serviceRequest";
import { PhonegapLocalNotification } from "@ionic-native/phonegap-local-notification";
import { UserNotification } from "../models/user-notification";
import { Guid } from "../models/guid";

@Injectable()
export class Notifications {
  serviceRequests: Array<ServiceRequest>;

  constructor(
    public db: AngularFirestore,
    private localNotification: PhonegapLocalNotification
  ) {}

  notifyUser(notification: UserNotification) {
    notification.id = Guid.newGuid();
    this.db
      .collection("/userNotifications")
      .doc(notification.id)
      .set(JSON.parse(JSON.stringify(notification)))
      .then(res => {});
  }

  trackNotifications(userId: string) {
    this.db
      .collection("/notifications", ref => ref.where("user.id", "==", userId))
      .valueChanges()
      .subscribe((data: any) => {
        // send Notification
        this.showNotification(data);
      });
  }

  private showNotification(notification: UserNotification) {
    this.localNotification.requestPermission().then(permission => {
      if (permission === "granted") {
        // Create the notification
        this.localNotification.create(notification.title, notification);
      }
    });
  }
}
