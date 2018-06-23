import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import {
  ActionSheetController,
  AlertController,
  ModalController,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Guid, ServiceRequest } from '../../models/serviceRequest';
import { PostsService } from '../../providers/posts-service/posts-service';
import { Items } from '../../providers/providers';
import { RequestProvider } from '../../providers/request/request-provider';
import { AddressSearchPage } from '../address-search/address-search';
import { TrackProgressPage } from '../track-progress/track-progress';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: "page-request-service",
  templateUrl: "request-service.html"
})
export class RequestServicePage {
  currentItems: any = [];
  item: Observable<any>;
  serviceCategories: Array<any>;
  vehicleTypes: Array<any>;
  test: Observable<any[]>;
  selectedCategory: any;
  selectedService: any;
  selectedVehicleType: any;
  currentLocation: any;

  gpsLocation: any;
  bookingDate: Date;
  bookingTimeRangeStart: number;
  bookingTimeRangeEnd: number;
  allowedHoursSelectionButtons: Array<any>;
  allowedHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  serviceRequest: ServiceRequest = new ServiceRequest();
  unsubscribe: firebase.Unsubscribe;

  constructor(
    private datePicker: DatePicker,
    public db: AngularFirestore,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public postsService: PostsService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public items: Items,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
    public requestProvider: RequestProvider,
    private modalCtrl:ModalController
  ) {

    let context = this;
    this.serviceCategories = [];
    this.currentLocation = {};

    this.selectedCategory = {
      name: "Car wash",
      id: "lcsWsBnfsmhm3iaFQIG4"
    };

    // get service types
    db.collection("/serviceCategory")
      .valueChanges()
      .subscribe(data => {
        this.serviceCategories = data;
      });

    // get vehicle types
    db.collection("/carWashVehicleType")
      .valueChanges()
      .subscribe(data => {
        this.vehicleTypes = data;
      });

    this.geolocation
      .getCurrentPosition()
      .then(resp => {

        context.currentLocation = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        };

        context.gpsLocation = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        };

      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: "Error!",
          subTitle:
            "Unable to access you location, please turn on you location",
          buttons: ["Dismiss"]
        });
        alert.present();
      });

    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //  });
  }

  getServices(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  selectLocation(){
    let modal = this.modalCtrl.create(AddressSearchPage);
    let context = this;
    modal.onDidDismiss(data => {

      if(!data){
        return;
      }

      if(data.useCurrentLocation){

        context.currentLocation = {
          latitude: this.gpsLocation.latitude,
          longitude: this.gpsLocation.longitude,
        }
        return;
      }

      context.currentLocation = {
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address
      };
    });
    modal.present();
  }
  selectServiceCategory() {
    let context = this;
    let actionButtons = [];

    this.serviceCategories.forEach(category => {
      actionButtons.push({
        text: category.name,
        role: "destructive",
        handler: () => {
          context.selectedCategory = category;
        }
      });
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: "Select service category",
      buttons: actionButtons
    });
    actionSheet.present();
  }

  selectVehicleType() {
    let context = this;
    let actionButtons = [];
    let vehicleTypes = [
      "SUV",
      "Hatchback",
      "Sedan",
      "Small single cabe",
      "Single cab",
      "Double cab"
    ];

    vehicleTypes.forEach(type => {
      actionButtons.push({
        text: type,
        role: "destructive",
        handler: () => {
          context.selectedVehicleType = type;
        }
      });
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Vehicle Type",
      buttons: actionButtons
    });
    actionSheet.present();
  }

  selectService() {
    if (!this.selectedCategory) {
      return;
    }

    let context = this;

    this.db
      .collection("/serviceCategory")
      .doc(this.selectedCategory.id)
      .collection("services")
      .valueChanges()
      .subscribe(data => {
        let actionButtons = [];

        data.forEach((service: any) => {
          actionButtons.push({
            text: service.name,
            role: "destructive",
            handler: () => {
              context.selectedService = service;
            }
          });
        });

        let actionSheet = this.actionSheetCtrl.create({
          title: "Select Service",
          buttons: actionButtons
        });
        actionSheet.present();
      });
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
      if (context.bookingTimeRangeStart < hour) {
        actionButtons.push({
          text: hour + " 00h",
          role: "destructive",
          handler: () => {
            context.bookingTimeRangeEnd = hour;
          }
        });
      }
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: "Select availability end time",
      buttons: actionButtons
    });
    actionSheet.present();
  }

  selectBookingDate() {
    let context = this;

    this.datePicker
      .show({
        date: new Date(),
        mode: "date",
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      })
      .then(date => (this.bookingDate = date));
  }

  requestService() {
    // remove fields that are for display purposes
    delete this.selectedService.isActive;

    // set defaults
    this.serviceRequest.requestDate = new Date();
    this.serviceRequest.bookingDate = new Date();
    this.serviceRequest.id = Guid.newGuid();
    this.serviceRequest.service = this.selectedService;
    this.serviceRequest.location = this.currentLocation;
    this.serviceRequest.bookingTimeRangeStart = this.bookingTimeRangeStart;
    this.serviceRequest.bookingTimeRangeEnd = this.bookingTimeRangeEnd;
    this.serviceRequest.vehicleType = this.selectedVehicleType;

    this.submitRequest();
  }

  submitRequest() {
    // check if the user is logged in
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.unsubscribe();
      if (user) {
        // set user name and id
        this.serviceRequest.user = { id: user.uid, name: user.email };
        // User is logged in- go to the confirmation page
        this.saveRequest(user);
      } else {
        // User is not logged in- go to the profile page

        let alert = this.alertCtrl.create({
          title: "Login Required",
          subTitle:
            "Creating service request requires authentication. Please login or create a profile",
          buttons: [
            {
              text: "OK",
              role: "cancel",
              handler: () => {
                this.requestProvider.currentServiceRequest = this.selectedService;
                this.navCtrl.setRoot(
                  WelcomePage,
                  {},
                  {
                    animate: true,
                    direction: "forward"
                  }
                );
              }
            }
          ]
        });
        alert.present();
      }
    });
  }

  newGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  saveRequest(user) {
    this.db
      .collection("/serviceRequests")
      .doc(this.serviceRequest.id)
      .set(JSON.parse(JSON.stringify(this.serviceRequest)))
      .then(res => {
        // Success
        let alert = this.alertCtrl.create({
          title: "Success!",
          subTitle:
            `Your request was saved successfully.
             Go to the 'Track Progress' screen to
             check for progress`,
          buttons: ["Dismiss"]
        });
        alert.present().then(res => {
          this.navCtrl.setRoot(TrackProgressPage);
        });
      })
      .catch(error => {
        // Error
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "Error occurred. Please try again later.",
          buttons: ["Dismiss"]
        });
        alert.present();
      });
  }
}
