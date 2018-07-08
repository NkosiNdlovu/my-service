import { Component } from '@angular/core';
import { LoadingController, ModalController, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { UserAccount } from '../../models/account';
import { UserService } from '../../providers/users-service/users-service';
import { UserListPage } from '../user-list/user-list';
import { AddressSearchPage } from '../address-search/address-search';

@Component({
  selector: "page-user-create",
  templateUrl: "user-create.html"
})
export class UserCreatePage {
  public userId: any;
  public guestPicture: any;
  public userDetails = [];
  providerDetails: any;
  gpsLocation: any;

  currentUser: UserAccount;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    let that = this;

    this.currentUser = new UserAccount();

    if (navParams.get("userId") && navParams.get("userId") != '') {
      this.userId = navParams.get("userId");
      this.userService.getUser(this.userId).subscribe((user: any) => {

        that.currentUser = user;

        if (that.currentUser.roles == undefined) {
          that.currentUser.roles = {
            admin: false,
            provider: true
          }
        }
      });
    } else {

      // set defaults
      this.userId = '';
      this.currentUser.roles = {
        admin: false,
        provider: true
      }
    }
  }

  ionViewDidLoad() {

  }

  getCurrentPosition(){
    let that = this;

    var loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });

    loader.present();
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        
        loader.dismiss();

        that.providerDetails.workingLocation = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        };

      })
      .catch(error => {
        
        loader.dismiss();

        let alert = this.alertCtrl.create({
          title: "Error!",
          subTitle:
            "Unable to access you location, please turn on you location",
          buttons: ["Dismiss"]
        });
        alert.present();
      });
  }
  
  saveUser() {
    const that = this;
    var loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });

    loader.present();

    this.userService.updateUserProfile(this.userId, this.currentUser).then(
      () => {
        loader.dismiss();
        //toast
        let toast = this.toastCtrl.create({
          message: "update successful",
          duration: 1500,
          position: "top"
        });

        // update user profile
        if (that.currentUser.roles.provider) {
          that.userService.updateProviderProfile(this.currentUser);
        }

        toast.onDidDismiss(() => {
          this.navCtrl.setRoot(UserListPage);
        });

        toast.present();
      },
      error => {
        loader.dismiss();

        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: "top"
        });

        toast.present();
      }
    );
  }

  selectProviderLocation() {
    let modal = this.modalCtrl.create(AddressSearchPage);
    let that = this;
    modal.onDidDismiss(data => {

      if (!data) {
        return;
      }

      if (data.useCurrentLocation) {
        that.getCurrentPosition();
        return;
      }

      that.providerDetails.currentLocation = {
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address
      };
    });
    modal.present();
  }
}
