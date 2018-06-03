import { Component } from "@angular/core";
import * as firebase from "firebase";
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { UserAccount } from "../../models/account";
import { PostsService } from "../../providers/posts-service/posts-service";
import { UserService } from "../../providers/users-service/users-service";
import { UserViewPage } from "../user-view/user-view";
import { UserListPage } from "../user-list/user-list";

@IonicPage()
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
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userService: UserService
  ) {
    let that = this;

    this.currentUser = new UserAccount();

    if (navParams.get("userId") && navParams.get("userId") != '') {
      this.userId = navParams.get("userId");
      this.userService.currentUser$.subscribe(user => {

        that.currentUser = user;
        console.log(that.currentUser)
        if(that.currentUser.roles == undefined){
          that.currentUser.roles = {
            admin: false,
            provider:true
          }
        }

      });
    } else {
      this.userId = '';
    }

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
