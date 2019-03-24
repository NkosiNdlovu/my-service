import { Component } from "@angular/core";
import { DatePicker } from "@ionic-native/date-picker";
import { Geolocation } from "@ionic-native/geolocation";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase";
import {
  ActionSheetController,
  AlertController,
  ModalController,
  NavController,
  ToastController,
  LoadingController
} from "ionic-angular";
import { Observable } from "rxjs/Observable";

import { Guid } from "../../models/guid";
import { ServiceRequest } from "../../models/serviceRequest";
import { RequestProvider } from "../../providers/request/request-provider";
import { AddressSearchPage } from "../address-search/address-search";
import { TrackProgressPage } from "../track-progress/track-progress";
import { WelcomePage } from "../welcome/welcome";
import { CarWashOptionsPage } from "../car-wash-options/car-wash-options";
import { VehicleType } from "./request-service.model";

@Component({
  selector: "page-request-service",
  templateUrl: "request-service.html"
})
export class RequestServicePage {
  currentItems: any = [];
  item: Observable<any>;
  totalCarWashPrice = 0;
  serviceCategories: Array<any>;
  vehicleTypes: Array<VehicleType>;
  test: Observable<any[]>;
  selectedCategory: any;
  selectedService: any;
  selectedVehicleType: VehicleType;
  currentLocation: any;

  gpsLocation: any;
  bookingDate: Date;
  bookingTimeRangeStart: number;
  bookingTimeRangeEnd: number;
  addedOptions = [];
  allowedHoursSelectionButtons: Array<any>;
  allowedHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  serviceRequest: ServiceRequest = new ServiceRequest();
  unsubscribe: firebase.Unsubscribe;

  approximateCost: number;

  constructor(
    private datePicker: DatePicker,
    public db: AngularFirestore,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    // public items: Items,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
    public requestProvider: RequestProvider,
    private modalCtrl: ModalController,
    public loadingCtrl: LoadingController
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
      .subscribe((data: any) => {
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

    this.setPreviousRequest();
  }

  getSelectedOptions() {
    return this.addedOptions.map(o => o.name).join(", ");
  }

  getTotalPrice() {
    if (!this.selectedVehicleType) {
      return 0;
    }

    let total = this.addedOptions
      .filter(o => o.selected == true)
      .map(o => o.price)
      .reduce((sum, current) => sum + current, 0);

    total += this.selectedVehicleType.price;

    return total;
  }

  getServices(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    // this.currentItems = this.items.query({
    //   name: val
    // });
  }

  selectLocation() {
    let modal = this.modalCtrl.create(AddressSearchPage);
    let context = this;
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      }

      if (data.useCurrentLocation) {
        context.currentLocation = {
          latitude: this.gpsLocation.latitude,
          longitude: this.gpsLocation.longitude
        };
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
      { name: "SUV", price: 100 },
      { name: "Hatchback/Sedan", price: 95 },
      { name: "Small single cab", price: 95 },
      { name: "Single cab", price: 95 },
      { name: "Double cab", price: 105 }
    ];

    vehicleTypes.forEach((type: any) => {
      actionButtons.push({
        text: type.name + " R " + type.price,
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

  selectAddedOptions() {
    let modal = this.modalCtrl.create(CarWashOptionsPage, {
      selectedCarWashPrice: this.selectedVehicleType.price
    });
    let context = this;
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      }

      this.addedOptions = data.filter(o => o.selected);
    });
    modal.present();
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

  setPreviousRequest() {
    if (!this.requestProvider.currentServiceRequest) {
      return;
    }

    // set previous values
    this.bookingDate = this.requestProvider.currentServiceRequest.bookingDate;

    this.selectedService = this.requestProvider.currentServiceRequest.service;
    // this.currentLocation = this.requestProvider.currentServiceRequest.location
    this.bookingTimeRangeStart = this.requestProvider.currentServiceRequest.bookingTimeRangeStart;
    this.bookingTimeRangeEnd = this.requestProvider.currentServiceRequest.bookingTimeRangeEnd;
    this.selectedVehicleType = this.requestProvider.currentServiceRequest.vehicleType;
    console.log(this.selectedVehicleType)
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
    this.serviceRequest.addedOptions = this.addedOptions;
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
                this.requestProvider.currentServiceRequest = this.serviceRequest;

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
    var loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.db
      .collection("/serviceRequests")
      .doc(this.serviceRequest.id)
      .set(JSON.parse(JSON.stringify(this.serviceRequest)))
      .then(res => {
        // Success
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: "Success!",
          subTitle: `Your request was saved successfully.
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

        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "Error occurred. Please try again later.",
          buttons: ["Dismiss"]
        });
        alert.present();
      });
  }
}
