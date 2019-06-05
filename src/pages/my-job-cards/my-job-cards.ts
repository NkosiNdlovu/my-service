import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActionSheetController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

import { ServiceProvider } from '../../models/serviceProvider';
import { ServiceRequest } from '../../models/serviceRequest';
import { UserService } from '../../providers/users-service/users-service';
import { MapPage } from '../map/map';
import { Notifications } from '../../providers/notifications';
import { UserNotification, NOTIFICATION_MESSAGES } from '../../models/user-notification';

@Component({
  selector: "page-my-job-cards",
  templateUrl: "my-job-cards.html"
})
export class MyJobCardsPage {
  jobs: Array<ServiceRequest>;
  userId: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public notifications: Notifications
  ) {
    this.jobs = [];
    this.userId = userService.currentUserId;
  }

  ionViewDidLoad() {
    this.db
      .collection("/serviceRequests", ref =>
        ref.where("providerId", "==", this.userId)
           .orderBy("requestDate", "desc")
      )
      .valueChanges()
      .subscribe((data: Array<ServiceRequest>) => {
        this.jobs = data;
        console.log(data)
      });
  }

  acceptJob(job: ServiceRequest) {
    if (!job.provider) {
      job.provider = new ServiceProvider();
      job.provider.id = this.userId;
    }

    job.provider.acceptJob = true;

    this.notifyUser('command-center', NOTIFICATION_MESSAGES.job_accepted);
    this.saveJob(job);
  }

  declineJob(job: ServiceRequest) {
    if (!job.provider) {
      job.provider = new ServiceProvider();
      job.provider.id = this.userId;
    }

    job.provider.declineJob = true;
    job.provider.acceptJob = false;

    this.saveJob(job);
    this.notifyUser(job.user.id, NOTIFICATION_MESSAGES.job_decline)
  }

  showActions(job) {
    const that = this;

    let actionButtons = [];
    if (!job.provider || !job.provider.acceptJob) {
      actionButtons.push({
        text: "Accept Request",
        role: "destructive",
        handler: () => {
          that.acceptJob(job);
        }
      });
    }

    actionButtons.push({
      text: "View on map",
      role: "destructive",
      handler: () => {
        that.openMap(job);
      }
    });

    if (job.provider && job.provider.acceptJob) {
      actionButtons.push({
        text: "Navigate to job",
        role: "destructive",
        handler: () => {
          that.navigate(job);
        }
      });

      actionButtons.push({
        text: "Confirm Arrival",
        role: "destructive",
        handler: () => {
          that.confirmArrival(job);
        }
      });

      if (job.provider && job.provider.arrivalTime) {
        actionButtons.push({
          text: "Confirm Completion",
          role: "destructive",
          handler: () => {
            that.confirmCompletion(job);
          }
        });
      }
    }

    actionButtons.push({
      text: "Decline Request",
      role: "destructive",
      handler: () => {
        that.declineJob(job);
      }
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: "Actions",
      buttons: actionButtons
    });
    actionSheet.present();
  }

  navigate(job) { }

  confirmArrival(job: ServiceRequest) {
    if (!job.provider) {
      job.provider = new ServiceProvider();
      job.provider.id = this.userId;
    }
    this.notifyUser(job.user.id, '')
    job.provider.arrivalTime = new Date();

    this.notifyUser(job.user.id, NOTIFICATION_MESSAGES.job_arrival);
    this.saveJob(job);
  }

  confirmCompletion(job: ServiceRequest) {
    if (!job.provider) {
      job.provider = new ServiceProvider();
      job.provider.id = this.userId;
    }

    job.provider.completionTime = new Date();

    this.notifyUser(job.user.id, NOTIFICATION_MESSAGES.job_complete);
    this.saveJob(job);
  }

  notifyUser(userId: string, message: string) {
    let note = new UserNotification();
    note.body = message;
    note.tag = 'My tag';
    note.title = 'FYRE CARWASH'
    note.userId = userId;
    this.notifications.notifyUser(note)
  }

  saveJob(job) {
    var loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.db
      .collection("/serviceRequests")
      .doc(job.id)
      .set(JSON.parse(JSON.stringify(job)))
      .then(
        res => {
          // successful
          loader.dismiss();
        },
        error => {
          loader.dismiss();
          // Unable to log in
          let toast = this.toastCtrl.create({
            message: "Error occurred",
            duration: 3000,
            position: "top"
          });
          toast.present();
        }
      );
  }
  openMap(serviceRequest) {
    this.navCtrl.push(MapPage, {
      serviceRequests: [serviceRequest]
    });
  }

  getSelectedOptions(job) {
    if (!job.addedOptions) {
      return "";
    }
    return job.addedOptions.map(o => o.name).join(", ");
  }

  getTransactionNumber(job) {
    let id: string;
    id = job.id;
    return id.substring(0, 8).toUpperCase();
  }
}
