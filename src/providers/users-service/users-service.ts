import "rxjs/add/operator/map";

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import * as firebase from "firebase";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { UserAccount } from "../../models/account";

@Injectable()
export class UserService {

  private _currentUserId: string;
  public data: any;
  public fireAuth: any;
  public userProfileCol: AngularFirestoreCollection<any>;
  set currentUserId(value) {
    this._currentUserId = value;
    this.getCurrentUserProfile();
  }
  get currentUserId() {
    return this._currentUserId;
  }
  currentUser$: BehaviorSubject<UserAccount>;

  constructor(private http: Http, public db: AngularFirestore) {
    this.fireAuth = firebase.auth();
    this.userProfileCol = db.collection("profiles");
    this.currentUser$ = new BehaviorSubject<UserAccount>(null);
  }

  loadUser(number) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http
        .get("https://randomuser.me/api/?results=" + number)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.results;
          resolve(this.data);
        });
    });
  }

  getCurrentUserProfile() {
    let context = this;
    var userRef = this.userProfileCol.doc(this.currentUserId);
    userRef.valueChanges().subscribe((user: UserAccount) => {
      context.currentUser$.next(user);
    });
  }
  getUsers(): any {
    return this.userProfileCol.valueChanges();
  }

  viewUser(userId: any) {
    var userRef = this.userProfileCol.doc(userId);
    return userRef.valueChanges();
  }

  signUpUser(account: {}) {
    console.log(account + "Values to view");
    let context = this;

    return this.fireAuth
      .createUserWithEmailAndPassword(account["email"], account["password"])
      .then(newUser => {
        //sign in the user
        var userRef = firebase
          .firestore()
          .collection("users")
          .doc(newUser.uid);
        userRef
          .set({
            name: name,
            email: account["email"],
            user: newUser.uid,
            adminEmail: ""
          })
          .then(function() {
            context.fireAuth
              .signInWithEmailAndPassword(account["email"], account["password"])
              .then(authenticatedUser => {
                // successful login, create user profile
                context.userProfileCol.doc(authenticatedUser.uid).set(account);
              });
          });
      });
  }

  updateUserProfile(userId,userAccount){
    // successful login, create user profile
    return this.userProfileCol.doc(userId).set(userAccount);
  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.fireAuth.signOut();
    //redirection
  }

  forgotPasswordUser(email: any) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  googleSignInUser() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/plus.login");

    var that = this;

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        if (result.user) {
          // The signed-in user info.
          let user = result.user;

          let res = result.user.displayName.split(" ");
          let userAccount = new UserAccount();

          // userAccount = {
          //   email: user.email,
          //   // photo: user.photoURL,
          //   username: user.displayName,
          //   name: {
          //     first: res[0],
          //     middle: res[1],
          //     last: res[2]
          //   }
          // };

          that.userProfileCol.doc(user.uid).set(userAccount);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
