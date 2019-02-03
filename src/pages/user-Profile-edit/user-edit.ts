import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { UserAccount } from '../../models/account';
import { UserService } from '../../providers/users-service/users-service';
import { UserViewPage } from '../user-view/user-view';
@Component({
  selector: "page-user-edit",
  templateUrl: "user-edit.html"
})
export class UserEditPage {
  public userId: any;
  currentUser: UserAccount;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userService: UserService,
    public loadingCtrl: LoadingController
  ) {

    let that = this;

    this.userId = firebase.auth().currentUser.uid; //current user id

    this.currentUser = new UserAccount();

    this.userService.currentUser$.subscribe((user) => {
      that.currentUser = user;
    })
  }

  updateProfile() {
    var loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.userService.updateUserProfile(this.userId, this.currentUser).then(
      () => {
        //toast
        loader.dismiss();

        let toast = this.toastCtrl.create({
          message: "update successful",
          duration: 1500,
          position: "top"
        });

        toast.onDidDismiss(() => {
          this.navCtrl.setRoot(UserViewPage, {
            key: this.userId
          });
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
}
