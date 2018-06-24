import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { UserAccount } from '../../models/account';
import { MainPage } from '../../pages/pages';
import { UserService } from '../../providers/users-service/users-service';

@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  providers: [UserService]
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  public skills: string;
  public email: any;
  public phone: any;
  public password: any;
  public firstName: any;
  public lastName: any;
  public city: any;
  public state: any;
  public country: any;

  // Our translated text strings
  private signupErrorString: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public usersService: UserService
  ) {
    this.translateService.get("SIGNUP_ERROR").subscribe(value => {
      this.signupErrorString = value;
    });
  }

  doSignup() {
    var account: UserAccount = {
      id : '',
      firstName: this.firstName,
      lastName: this.lastName || "",
      skills: this.skills || "",
      email: this.email,
      phone: this.phone || "",
      password: this.password,
      city: this.city || "",
      state: this.state || "",
      country: this.country || "",
      roles: { user: true }
    };
    var that = this;

    var loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.usersService.signUpUser(account).then(
      authData => {
        //successful
        loader.dismiss();
        that.navCtrl.setRoot(MainPage);
      },
      error => {
        loader.dismiss();
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: "top"
        });
        toast.present();

        that.password = ""; //empty the password field
      }
    );
  }
}
