import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { UserAccount } from '../../models/account';
import { UserService } from '../../providers/users-service/users-service';
import { UserListPage } from '../user-list/user-list';

@Component({
  selector: "page-user-create",
  templateUrl: "user-create.html"
})
export class UserCreatePage {
  public userId: any;
  public guestPicture: any;
  public userDetails = [];

  currentUser: UserAccount;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userService: UserService
  ) {
    let that = this;

    this.currentUser = new UserAccount();

    if (navParams.get("userId") && navParams.get("userId") != '') {
      this.userId = navParams.get("userId");
      this.userService.getUser(this.userId).subscribe((user:any) => {

        that.currentUser = user;

        if(that.currentUser.roles == undefined){
          that.currentUser.roles = {
            admin: false,
            provider:true
          }
        }
      });
    } else {

      // set defaults
      this.userId = '';
      this.currentUser.roles = {
        admin: false,
        provider:true
      }
    }
  }

  ionViewDidLoad() {

  }

  saveUser() {

    this.userService.updateUserProfile(this.userId, this.currentUser).then(
      () => {
        //toast
        let toast = this.toastCtrl.create({
          message: "update successful",
          duration: 1500,
          position: "top"
        });

        toast.onDidDismiss(() => {
          this.navCtrl.push(UserListPage);
        });

        toast.present();
      },
      error => {
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
