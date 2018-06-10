import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  ActionSheetController
} from "ionic-angular";
import { MapPage } from "../map/map";
import { AngularFirestore } from "angularfire2/firestore";
import { UserService } from "../../providers/users-service/users-service";
import {
  ServiceRequest,
  ServiceRequestProvider
} from "../../models/serviceRequest";

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
    public actionSheetCtrl: ActionSheetController
  ) {
    this.jobs = [];
    this.userId = userService.currentUserId;
  }

  ionViewDidLoad() {
    this.db
      .collection("/serviceRequests", ref =>
        ref.where("providerId", "==", this.userId)
      )
      .valueChanges()
      .subscribe((data: Array<ServiceRequest>) => {
        this.jobs = data;
      });
  }

  acceptJob(job: ServiceRequest) {
    if (!job.provider) {
      job.provider = new ServiceRequestProvider();
      job.provider.id = this.userId;
    }

    job.provider.acceptJob = true;

    this.saveJob(job);
  }

  declineJob(job: ServiceRequest) {
    if (!job.provider) {
      job.provider = new ServiceRequestProvider();
      job.provider.id = this.userId;
    }

    job.provider.declineJob = true;
    job.provider.acceptJob = false;
    console.log(job)
    this.saveJob(job);
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

  navigate(job) {}

  confirmArrival(job: ServiceRequest) {
    if (!job.provider) {
      job.provider = new ServiceRequestProvider();
      job.provider.id = this.userId;
    }

    job.provider.arrivalTime = new Date();
    this.saveJob(job);
  }

  confirmCompletion(job: ServiceRequest) {
    if (!job.provider) {
      job.provider = new ServiceRequestProvider();
      job.provider.id = this.userId;
    }

    job.provider.completionTime = new Date();
    this.saveJob(job);
  }

  saveJob(job) {
    let that = this;
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
}
