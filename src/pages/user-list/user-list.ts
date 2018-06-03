import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { UserAccount } from '../../models/account';
import { PostsService } from '../../providers/posts-service/posts-service';
import { UserService } from '../../providers/users-service/users-service';
import { UserViewPage } from '../user-view/user-view';

@Component({
  selector: "page-user-list",
  templateUrl: "user-list.html",
  providers: [PostsService]
})
export class UserListPage {
  public userId: any;
  public guestPicture: any;
  public userDetails = [];

  users: Array<UserAccount>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userService: UserService
  ) {

    let that = this;

    this.userId = firebase.auth().currentUser.uid; //current user id

    this.users = []

    this.userService.getUsers().subscribe((user) => {
      that.users = user;
    })
  }

  editUser(){

  }
}
