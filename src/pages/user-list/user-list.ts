import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

import { UserAccount } from '../../models/account';
import { PostsService } from '../../providers/posts-service/posts-service';
import { UserService } from '../../providers/users-service/users-service';
import { UserCreatePage } from '../user-create/user-create';

@Component({
  selector: "page-user-list",
  templateUrl: "user-list.html",
  providers: [PostsService]
})
export class UserListPage {
  users: Array<UserAccount>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userService: UserService
  ) {

    this.users = [];

  }

  ionViewDidLoad() {
    let that = this;

    this.userService.getUsers().subscribe((users: any) => {
      console.log(users);
      that.users = users;
    });

  }

  editUser(userId) {
    this.navCtrl.push(UserCreatePage, { userId: userId });
  }

  createNew() {
    this.navCtrl.push(UserCreatePage, { userId: '' });
  }
}
