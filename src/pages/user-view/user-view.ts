import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

import { UserAccount } from '../../models/account';
import { UserService } from '../../providers/users-service/users-service';
import { LoginPage } from '../login/login';
import { UserEditPage } from '../user-profile-edit/user-edit';

@Component({
  selector: "page-user-view",
  templateUrl: "user-view.html",
  providers: [UserService]
})
export class UserViewPage {
  public userDisplayName: any;
  public userCity: any;
  public userState: any;
  public userSkills: any;
  public userPhone: any;
  public myUserId: any;
  public userCountry: any;
  public userAbout: any;
  userEmail: string;

  constructor(
    public alertCtrl: AlertController,
    public toatCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersService: UserService
  ) {
    this.myUserId = firebase.auth().currentUser.uid; //current user id

    if (navParams.get("key")) {
      this.myUserId = this.navParams.get("key"); //
    }
  }

  ionViewDidLoad(){
    this.displayUser(this.myUserId);
  }

  displayUser(theUserId) {
    var that = this;

    this.usersService.getUser(theUserId).subscribe((user: UserAccount) => {
      // get user photo
      if (user) {

        that.userDisplayName = user.firstName + " " + user.lastName;
        that.userCity = user.city || "";
        that.userState = user.state || "";
        that.userPhone = user.phone || "";
        that.userCountry = user.country || "";
        that.userEmail = user.email || ""
      }
    });
  }

  editProfile() {
    this.navCtrl.push(UserEditPage);
  }

  logUserOut() {
    //pop to confirm if user really wishes to logout

    let confirm = this.alertCtrl.create({
      title: "Are you sure you want to logout?",
      message: "",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            //do nothing
          }
        },
        {
          text: "Yes",
          handler: () => {
            //call user logout service
            this.usersService.logoutUser().then(() => {
              //show toast before redirecting
              this.navCtrl.setRoot(LoginPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
