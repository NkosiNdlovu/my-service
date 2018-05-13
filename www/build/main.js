webpackJsonp([2],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PostsService = /** @class */ (function () {
    function PostsService(http) {
        this.http = http;
        this.userNode = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref('users');
        this.postsNode = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref('posts');
        this.usersPostsNode = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref('user-posts');
        this.fireRef = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref();
        //  this.userId = firebase.auth().currentUser.uid;
        //this.eventList = firebase.database().ref('questions/' + this.userId + '/questionPictures');
    }
    PostsService.prototype.listSomethingOnceService = function (path) {
        return __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref(path).once('value');
    };
    PostsService.prototype.addAnythingService = function (path, data) {
        // Get a key for a new path.
        var newPostKey = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref('/categories').push().key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updatePath = {};
        updatePath[path + '/' + newPostKey] = data;
        //update one or more tables simultaneously
        return this.fireRef.update(updatePath);
    };
    PostsService.prototype.viewAnythingService = function (path) {
        return __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref().child(path).once('value');
    };
    //view all posts made by this userId
    PostsService.prototype.viewUsersPostsService = function (userId) {
        var userRef = this.usersPostsNode.child(userId);
        return userRef.on('value');
    };
    PostsService.prototype.deleteAnything = function (path) {
        console.log("delete arrives service");
        var updatePath = {};
        updatePath[path] = null;
        return this.fireRef.update(updatePath);
    };
    PostsService.prototype.createAnythingService = function () {
    };
    PostsService.prototype.updateAnythingService = function (path, postData) {
        /* var updatePath = {};
         updatePath[path] = postData;
       
       //update both nodes simultaneously
         return this.fireRef.set(updatePath); */
        // return firebase.database().ref(path).set(postData);
        // Get a key for a new Post.
        var newPostKey = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref().child('posts').push().key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/' + path] = postData;
        return __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref().update(updates);
    };
    PostsService.prototype.overwriteAnythingService = function (path, postData) {
        //permanently overwrites whatever is on the node before
        //this is different from update()
        return __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref(path).set(postData);
    };
    PostsService.prototype.listPostService = function () {
        return this.postsNode.once('value');
    };
    PostsService.prototype.createPostService = function (userId, postBody) {
        // A post entry.
        var postData = {
            uid: userId,
            body: postBody
        };
        // Get a key for a new Post.
        var newPostKey = this.postsNode.push().key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updatePath = {};
        updatePath['/posts/' + newPostKey] = postData;
        updatePath['/user-posts/' + userId + "/" + newPostKey] = postData;
        //update both tables simultaneously
        return this.fireRef.update(updatePath);
    };
    PostsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], PostsService);
    return PostsService;
}());

//# sourceMappingURL=posts-service.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_pages__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_users_service_users_service__ = __webpack_require__(174);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { User } from '../../providers/user';

var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, alertCtrl, toastCtrl, translateService, usersService, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.usersService = usersService;
        this.loadingCtrl = loadingCtrl;
        this.account = {
            email: this.email,
            password: this.password
        };
        this.translateService.get('LOGIN_ERROR').subscribe(function (value) {
            _this.loginErrorString = value;
        });
    }
    LoginPage.prototype.redirectToSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.submitLogin = function () {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
        this.usersService.loginUser(this.email, this.password).then(function (authData) {
            //successful
            loader.dismiss();
            that.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_pages__["b" /* MainPage */]);
        }, function (error) {
            loader.dismiss();
            // Unable to log in
            var toast = _this.toastCtrl.create({
                message: error,
                duration: 3000,
                position: 'top'
            });
            toast.present();
            that.password = ""; //empty the password field
        });
    };
    LoginPage.prototype.showForgotPassword = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Enter Your Email',
            message: "A new password will be sent to your email",
            inputs: [
                {
                    name: 'recoverEmail',
                    placeholder: 'you@example.com'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: function (data) {
                        //add preloader
                        var loading = _this.loadingCtrl.create({
                            dismissOnPageChange: true,
                            content: 'Reseting your password..'
                        });
                        loading.present();
                        //call usersservice
                        _this.usersService.forgotPasswordUser(data.recoverEmail).then(function () {
                            //add toast
                            loading.dismiss().then(function () {
                                //show pop up
                                var alert = _this.alertCtrl.create({
                                    title: 'Check your email',
                                    subTitle: 'Password reset successful',
                                    buttons: ['OK']
                                });
                                alert.present();
                            });
                        }, function (error) {
                            //show pop up
                            loading.dismiss().then(function () {
                                var alert = _this.alertCtrl.create({
                                    title: 'Error resetting password',
                                    subTitle: error.message,
                                    buttons: ['OK']
                                });
                                alert.present();
                            });
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\login\login.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title text-center> {{ \'LOGIN_TITLE\' | translate }}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n<div class="splash-logo"></div>\n\n<br/>\n\n<br/>\n\n  <form >\n\n    <ion-list>\n\n     <!-- <ion-item>\n\n        <ion-label fixed>{{ \'EMAIL\' | translate }}</ion-label>\n\n        <ion-input type="email" [(ngModel)]="account.email" name="email"></ion-input>\n\n      </ion-item> -->\n\n      <ion-item>\n\n        <ion-label stacked>Email</ion-label> \n\n        <ion-input type="email" [(ngModel)]="email" name="email"  required="required"></ion-input>\n\n      </ion-item>\n\n\n\n      <!--\n\n      Want to use a Username instead of an Email? Here you go:\n\n\n\n      <ion-item>\n\n        <ion-label floating>{{ \'USERNAME\' | translate }}</ion-label>\n\n        <ion-input type="text" [(ngModel)]="account.username"></ion-input>\n\n      </ion-item>\n\n      -->\n\n\n\n      <ion-item>\n\n        <ion-label stacked>{{ \'PASSWORD\' | translate }}</ion-label>\n\n        <ion-input type="password" [(ngModel)]="password" name="password" required="required"></ion-input>\n\n      </ion-item>\n\n\n\n      <div padding text-center>\n\n       \n\n         <button *ngIf="email && password " ion-button color="danger" round (click)="submitLogin()">{{ \'LOGIN_BUTTON\' | translate }}</button>\n\n        <!-- Show dead button if form is not filled -->\n\n        <button *ngIf="!email && !password" ion-button color="danger" clear round>Login Now</button>\n\n        \n\n        \n\n      </div>\n\n     \n\n\n\n    </ion-list>\n\n  </form>\n\n  \n\n   <br/>\n\n      \n\n      <div padding text-center>\n\n        <button ion-button color="gray" block clear (click)="redirectToSignup()">Create new account</button>\n\n      </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\login\login.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_users_service_users_service__["a" /* UsersService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_users_service_users_service__["a" /* UsersService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_pages__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_users_service_users_service__ = __webpack_require__(174);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, loadingCtrl, toastCtrl, translateService, usersService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.usersService = usersService;
        this.translateService.get('SIGNUP_ERROR').subscribe(function (value) {
            _this.signupErrorString = value;
        });
    }
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        var account = {
            first_name: this.first_name,
            last_name: this.last_name || '',
            skills: this.skills || '',
            email: this.email,
            phone: this.phone || '',
            password: this.password,
            city: this.city || '',
            state: this.state || '',
            country: this.country || ''
        };
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
        console.log(account);
        this.usersService.signUpUser(account).then(function (authData) {
            //successful
            loader.dismiss();
            that.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_pages__["b" /* MainPage */]);
        }, function (error) {
            loader.dismiss();
            // Unable to log in
            var toast = _this.toastCtrl.create({
                message: error,
                duration: 3000,
                position: 'top'
            });
            toast.present();
            that.password = ""; //empty the password field
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\signup\signup.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title class="text-center"><ion-icon name="add-circle"></ion-icon> {{ \'SIGNUP_TITLE\' | translate }}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n<div class="splash-logo"></div>\n\n\n\n  <form (submit)="doSignup()">\n\n    <ion-list>\n\n    \n\n      <!-- <ion-item >\n\n        <ion-label stacked>Skill Set (separate with comma)</ion-label>\n\n        <ion-input type="text" [(ngModel)]="skills" name="skills" placeholder="eg. PHP, Writing, Chef" required="required"></ion-input>\n\n      </ion-item>\n\n       -->\n\n     <ion-item>\n\n        <ion-label stacked>{{ \'EMAIL\' | translate }}</ion-label>\n\n        <ion-input type="email" [(ngModel)]="email" name="email" placeholder="eg. john@doe.com"></ion-input>\n\n      </ion-item>\n\n\n\n      <!--\n\n      Want to add a Username? Here you go:\n\n\n\n      <ion-item>\n\n        <ion-label floating>Username</ion-label>\n\n        <ion-input type="text" [(ngModel)]="account.username" name="username"></ion-input>\n\n      </ion-item>\n\n      -->\n\n\n\n      <ion-item>\n\n        <ion-label stacked>{{ \'PASSWORD\' | translate }}</ion-label>\n\n        <ion-input type="password" [(ngModel)]="password" name="password"></ion-input>\n\n      </ion-item>\n\n <!--     \n\n      <ion-item>\n\n        <ion-label stacked>Repeat Password</ion-label>\n\n        <ion-input type="password" [(ngModel)]="repeat-password" name="repeat-password"></ion-input>\n\n      </ion-item>\n\n-->\n\n\n\n<hr/>\n\n      <ion-item>\n\n        <ion-label stacked>First name</ion-label>\n\n        <ion-input type="text" [(ngModel)]="first_name" name="first_name"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label stacked>Last name</ion-label>\n\n        <ion-input type="text" [(ngModel)]="last_name" name="last_name"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label stacked>City</ion-label>\n\n        <ion-input type="text" [(ngModel)]="city" name="city"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label stacked>State/Province</ion-label>\n\n        <ion-input type="text" [(ngModel)]="state" name="state"></ion-input>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item >\n\n        <ion-label stacked>Phone</ion-label>\n\n        <ion-input type="text" [(ngModel)]="phone" name="phone" placeholder="eg. 0802222222" required="required"></ion-input>\n\n      </ion-item>\n\n\n\n\n\n\n\n     \n\n\n\n      <div padding text-center>\n\n        <button ion-button color="danger" round>{{ \'SIGNUP_BUTTON\' | translate }}</button>\n\n      </div>\n\n\n\n    </ion-list>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\signup\signup.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_users_service_users_service__["a" /* UsersService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__providers_users_service_users_service__["a" /* UsersService */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RequestHistoryPage = /** @class */ (function () {
    function RequestHistoryPage(navCtrl, navParams, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.serviceRequests = [];
        db.collection('/serviceRequests').valueChanges().subscribe(function (data) {
            _this.serviceRequests = data;
            console.log(data);
        });
    }
    RequestHistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RequestHistoryPage');
    };
    RequestHistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-request-history',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\request-history\request-history.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Request history</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n\n  <ion-list>\n\n    <!-- <ion-list-header>Today</ion-list-header> -->\n\n    <ion-item *ngFor="let request of serviceRequests">\n      <ion-avatar item-left>\n        <ion-icon name="car"></ion-icon>\n      </ion-avatar>\n      <h2>{{request.service?.name}}</h2>\n      <p>Comment: {{request.comment}}</p>\n      <div item-right>\n        <p>\n          <ion-note>{{request.requestDate | timeAgo }}</ion-note>\n        </p>\n        <ion-note>Booking: {{request.bookingDate | date}}</ion-note>\n      </div>\n\n      <ion-icon item-right name="done-all"></ion-icon>\n      \n    </ion-item>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\request-history\request-history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], RequestHistoryPage);
    return RequestHistoryPage;
}());

//# sourceMappingURL=request-history.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_posts_service_posts_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_view_user_view__ = __webpack_require__(169);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { ImagePicker } from '@ionic-native/image-picker';
/**
 * Generated class for the UserEdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserEditPage = /** @class */ (function () {
    function UserEditPage(navCtrl, alertCtrl, navParams, toastCtrl, postsService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.postsService = postsService;
        this.userDetails = [];
        this.myUserId = __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().currentUser.uid; //current user id
        this.getUserDetails(this.myUserId);
    }
    UserEditPage.prototype.getUserDetails = function (userId) {
        var _this = this;
        var that = this;
        var toast = this.toastCtrl.create({
            message: 'Fetching user profile...',
        });
        toast.present();
        this.postsService.listSomethingOnceService('/users/' + userId).then(function (snapshot) {
            //that.userDetails.length = null; //so that it ddoesn't repeat the list
            var data = snapshot.val();
            data['profilePic'] = '/assets/img/marty-avatar.png';
            that.userDetails.push(snapshot.val());
            that.userId = snapshot.key;
            that.skills = snapshot.val().skills || '';
            that.email = snapshot.val().email || '';
            that.phone = snapshot.val().phone || '';
            that.first_name = snapshot.val().first_name || '';
            that.last_name = snapshot.val().last_name || '';
            that.city = snapshot.val().city || '';
            that.about = snapshot.val().about || '';
            that.state = snapshot.val().state || '';
            that.country = snapshot.val().country || '';
            toast.dismiss();
        }, function (error) {
            var toast = _this.toastCtrl.create({
                message: 'Sorry couldnt retrive user details, check your internet connection',
                duration: 3000
            });
            toast.present();
        });
    };
    UserEditPage.prototype.updateProfile = function () {
        var _this = this;
        var postData = {
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            skills: this.skills,
            phone: this.phone,
            city: this.about,
            state: this.state,
            country: this.country,
        };
        console.log(postData);
        this.postsService.updateAnythingService('users/' + this.myUserId, postData).then(function () {
            //toast
            var toast = _this.toastCtrl.create({
                message: 'update successful',
                duration: 1500,
                position: 'top'
            });
            toast.onDidDismiss(function () {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__user_view_user_view__["a" /* UserViewPage */], {
                    key: _this.myUserId
                });
            });
            toast.present();
        }, function (error) {
            var toast = _this.toastCtrl.create({
                message: error.message,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    UserEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-edit',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\user-edit\user-edit.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Edit Your Profile</ion-title>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n<ion-card>\n\n  <img src="{[userDetails.profilePic}}"/>\n\n  <ion-card-content>\n\n    <ion-card-title>\n\n      {{first_name}} {{last_name}}\n\n      </ion-card-title>\n\n    <p>\n\n      {{about}}\n\n    </p>\n\n  </ion-card-content>\n\n</ion-card>\n\n\n\n\n\n  <form >\n\n    <ion-list>\n\n    \n\n      <ion-item >\n\n        <ion-label stacked>Skill Set (separate with comma)</ion-label>\n\n        <ion-input type="text" [(ngModel)]="skills" name="skills" placeholder="eg. PHP, Writing, Chef" required="required"></ion-input>\n\n      </ion-item>\n\n\n\n<hr/>\n\n      <ion-item>\n\n        <ion-label stacked>First name</ion-label>\n\n        <ion-input type="text" [(ngModel)]="first_name" name="first_name"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label stacked>Last name</ion-label>\n\n        <ion-input type="text" [(ngModel)]="last_name" name="last_name"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label stacked>City</ion-label>\n\n        <ion-input type="text" [(ngModel)]="city" name="city"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label stacked>State/Province</ion-label>\n\n        <ion-input type="text" [(ngModel)]="state" name="state"></ion-input>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item >\n\n        <ion-label stacked>Phone</ion-label>\n\n        <ion-input type="text" [(ngModel)]="phone" name="phone" placeholder="eg. 0802222222" required="required"></ion-input>\n\n      </ion-item>\n\n\n\n\n\n\n\n     \n\n\n\n      <div padding text-center>\n\n        <button ion-button color="danger" round  (click)="updateProfile()">Update Profile </button>\n\n      </div>\n\n\n\n    </ion-list>\n\n  </form>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\user-edit\user-edit.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_posts_service_posts_service__["a" /* PostsService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_posts_service_posts_service__["a" /* PostsService */]])
    ], UserEditPage);
    return UserEditPage;
}());

//# sourceMappingURL=user-edit.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_edit_user_edit__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_users_service_users_service__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { Items } from '../../providers/providers';
var UserViewPage = /** @class */ (function () {
    function UserViewPage(alertCtrl, toatCtrl, navCtrl, navParams, usersService) {
        this.alertCtrl = alertCtrl;
        this.toatCtrl = toatCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usersService = usersService;
        this.myUserId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid; //current user id
        if (navParams.get('key')) {
            this.myUserId = this.navParams.get('key'); //
        }
        this.displayUser(this.myUserId);
    }
    UserViewPage.prototype.displayUser = function (theUserId) {
        var that = this;
        this.usersService.viewUser(theUserId).then(function (snapshot) {
            //get user photo
            if (snapshot.val()) {
                that.userPhotoUrl = snapshot.val().photo || ''; //get user photo
                that.userDislplayName = snapshot.val().first_name + ' ' + snapshot.val().last_name;
                that.userSkills = snapshot.val().skills || '';
                that.userAbout = snapshot.val().about || '';
                that.userCity = snapshot.val().city || '';
                that.userState = snapshot.val().state || '';
                that.userPhone = snapshot.val().phone || '';
                that.userCountry = snapshot.val().country || '';
                //that.userCountry= snapshot.val().username || ''; 
                console.log("This is the user name: " + that.userDislplayName);
            }
        });
    };
    UserViewPage.prototype.editProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__user_edit_user_edit__["a" /* UserEditPage */]);
    };
    UserViewPage.prototype.logUserOut = function () {
        //pop to confirm if user really wishes to logout
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Are you sure you want to logout?',
            message: '',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        //do nothing 
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        //call user logout service
                        _this.usersService.logoutUser().then(function () {
                            //show toast before redirecting 
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    UserViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-view',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\user-view\user-view.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ userDislplayName }}</ion-title>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  <ion-buttons end>\n\n      <button ion-button icon-only (click)="editProfile()">\n\n        <ion-icon name="create"></ion-icon>\n\n      </button>\n\n      <button ion-button icon-only (click)="logUserOut()">\n\n        <ion-icon name="power"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n</ion-navbar>\n\n  \n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-card>\n\n\n\n  <ion-item>\n\n    <ion-avatar item-left>\n\n      <img src="assets/img/advance-card-bttf.png">\n\n    </ion-avatar>\n\n    <h2>{{userDislplayName}}</h2>\n\n    <p>{{userCity}} , {{userState}}</p>\n\n  </ion-item>\n\n\n\n  <img src="assets/img/marty-avatar.png">\n\n\n\n<ion-card *ngIf="userAbout">\n\n\n\n  <ion-card-header>\n\n   About\n\n  </ion-card-header>\n\n\n\n  <ion-card-content>\n\n   {{userAbout}}\n\n  </ion-card-content>\n\n\n\n</ion-card>\n\n\n\n\n\n  <ion-item>\n\n    <span item-left>18 min away</span>\n\n    <span item-left>(2.6 mi)</span>\n\n    <button ion-button icon-left clear item-right>\n\n      <ion-icon name="navigate"></ion-icon>\n\n      View Map\n\n    </button>\n\n  </ion-item>\n\n<button ion-button block  color="light" *ngIf="userPhone"><ion-icon name="call"></ion-icon> &nbsp; {{userPhone}}</button>\n\n  \n\n  \n\n\n\n  <ion-item>\n\n    <ion-icon name="cog" item-left large></ion-icon>\n\n    <h2>{{userSkills}}</h2>\n\n    <p>Several years experience </p>\n\n  </ion-item>\n\n\n\n\n\n</ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\user-view\user-view.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_users_service_users_service__["a" /* UsersService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_users_service_users_service__["a" /* UsersService */]])
    ], UserViewPage);
    return UserViewPage;
}());

//# sourceMappingURL=user-view.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, translateService) {
        this.navCtrl = navCtrl;
        this.translateService = translateService;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__pages__["c" /* Tab1Root */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__pages__["d" /* Tab2Root */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__pages__["e" /* Tab3Root */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\tabs\tabs.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button>\n\n        <ion-icon name="contact"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      Request service\n\n    </ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button >\n\n        <ion-icon name="more"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-tabs>\n\n\n\n  <ion-tab [root]="tab2Root" tabTitle="Service" tabIcon="search"></ion-tab>\n\n  <ion-tab [root]="tab1Root" tabTitle="Providers" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="Profile" tabIcon="contact"></ion-tab>\n\n</ion-tabs>'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["c" /* TranslateService */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__welcome_welcome__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TutorialPage = /** @class */ (function () {
    function TutorialPage(navCtrl, menu, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.showSkip = true;
        translate.get(["TUTORIAL_SLIDE1_TITLE",
            "TUTORIAL_SLIDE1_DESCRIPTION",
            "TUTORIAL_SLIDE2_TITLE",
            "TUTORIAL_SLIDE2_DESCRIPTION",
            "TUTORIAL_SLIDE3_TITLE",
            "TUTORIAL_SLIDE3_DESCRIPTION",
        ])
            .subscribe(function (values) {
            console.log('Loaded values', values);
            _this.slides = [
                {
                    title: 'Welcome to Service-24-6!',
                    description: 'Service-24-6 helps you discover service providers.',
                    image: 'assets/img/ica-slidebox-img-1.png',
                },
                {
                    title: 'Search and Discover Service providers around you!',
                    description: 'Service-24-6 uses informative maps to inform you of service providers around',
                    image: 'assets/img/ica-slidebox-img-2.png',
                },
                {
                    title: 'Service-24-6 connects you',
                    description: 'This is one of the best apps in the world in the service industry',
                    image: 'assets/img/ica-slidebox-img-3.png',
                }
            ];
        });
    }
    TutorialPage.prototype.startApp = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__welcome_welcome__["a" /* WelcomePage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    TutorialPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd;
    };
    TutorialPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    TutorialPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    };
    TutorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tutorial',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\tutorial\tutorial.html"*/'<ion-header no-shadow>\n\n  <ion-navbar>\n\n      <ion-title >Service-24-6</ion-title>\n\n    <ion-buttons end *ngIf="showSkip">\n\n      <button ion-button (click)="startApp()" color="light">{{ \'TUTORIAL_SKIP_BUTTON\' | translate}}</button>\n\n    </ion-buttons>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-bounce>\n\n  <ion-slides  (ionWillChange)="onSlideChangeStart($event)">\n\n    <ion-slide *ngFor="let slide of slides">\n\n      <img [src]="slide.image" class="slide-image" style="border-radius: 10px;"/>\n\n      <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n\n      <p [innerHTML]="slide.description"></p>\n\n\n\n      <br/>\n\n      <button ion-button round color="primary" clear block><<< Slide To The Left</button>\n\n\n\n    </ion-slide>\n\n    <ion-slide>\n\n      <img src="assets/img/ica-slidebox-img-4.png" class="slide-image"/>\n\n      <h2 class="slide-title">Are you ready? Let\'s go there!</h2>\n\n\n\n\n\n      <button ion-button icon-right large warning color="danger" (click)="startApp()">\n\n        {{ \'TUTORIAL_CONTINUE_BUTTON\' | translate }}\n\n        <ion-icon name="arrow-forward"></ion-icon>\n\n      </button>\n\n    </ion-slide>\n\n  </ion-slides>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\tutorial\tutorial.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["c" /* TranslateService */]])
    ], TutorialPage);
    return TutorialPage;
}());

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    WelcomePage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    WelcomePage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    WelcomePage.prototype.forgotPassword = function () {
        //nothin yet, should show a pop-up instead of a redirect
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\welcome\welcome.html"*/'<ion-content scroll="false">\n\n  <div class="splash-bg"></div>\n\n  <div class="splash-info">\n\n    <div class="splash-logo"></div>\n\n    <div class="splash-intro">\n\n      Join Service-24-6!\n\n    </div>\n\n  </div>\n\n  <div padding text-center>\n\n\n\n    <button ion-button round color="light" (click)="login()" >{{ \'LOGIN\' | translate }}</button>\n\n    <button ion-button round color="danger" (click)="signup()" >{{ \'SIGNUP\' | translate }}</button>\n\n  </div>\n\n\n\n    <button ion-button round color="primary" clear (click)="forgotPass()" block>Forgot Password</button>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\welcome\welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsersService = /** @class */ (function () {
    function UsersService(http) {
        this.http = http;
        this.fireAuth = __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]();
        this.userProfile = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref('users');
    }
    UsersService.prototype.loadUser = function (number) {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.http.get('https://randomuser.me/api/?results=' + number)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data.results;
                resolve(_this.data);
            });
        });
    };
    UsersService.prototype.viewUser = function (userId) {
        var userRef = this.userProfile.child(userId);
        return userRef.once('value');
    };
    UsersService.prototype.signUpUser = function (account) {
        var _this = this;
        console.log(account + "Values to view");
        return this.fireAuth.createUserWithEmailAndPassword(account['email'], account['password']).then(function (newUser) {
            //sign in the user
            _this.fireAuth.signInWithEmailAndPassword(account['email'], account['password']).then(function (authenticatedUser) {
                //successful login, create user profile
                _this.userProfile.child(authenticatedUser.uid).set(account);
            });
        });
    };
    UsersService.prototype.loginUser = function (email, password) {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    };
    UsersService.prototype.logoutUser = function () {
        return this.fireAuth.signOut();
        //redirection
    };
    UsersService.prototype.forgotPasswordUser = function (email) {
        return this.fireAuth.sendPasswordResetEmail(email);
    };
    UsersService.prototype.googleSignInUser = function () {
        var provider = new __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"].GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        var that = this;
        return __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().signInWithPopup(provider).then(function (result) {
            if (result.user) {
                // The signed-in user info.
                var user = result.user;
                var res = result.user.displayName.split(" ");
                that.userProfile.child(user.uid).set({
                    email: user.email,
                    photo: user.photoURL,
                    username: user.displayName,
                    name: {
                        first: res[0],
                        middle: res[1],
                        last: res[2],
                    },
                });
            }
        }).catch(function (error) {
            console.log(error);
            //alert("error "+error.message);
        });
    };
    UsersService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], UsersService);
    return UsersService;
}());

//# sourceMappingURL=users-service.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mocks_providers_items__ = __webpack_require__(311);
/* unused harmony reexport User */
/* unused harmony reexport Api */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__settings__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__mocks_providers_items__["a"]; });





//# sourceMappingURL=providers.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Api is a generic REST Api handler. Set your API url first.
 */
var Api = /** @class */ (function () {
    function Api(http) {
        this.http = http;
        this.url = 'https://example.com/api/v1';
    }
    Api.prototype.get = function (endpoint, params, options) {
        if (!options) {
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
        }
        // Support easy query params for GET requests
        if (params) {
            var p = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
            for (var k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }
        return this.http.get(this.url + '/' + endpoint, options);
    };
    Api.prototype.post = function (endpoint, body, options) {
        return this.http.post(this.url + '/' + endpoint, body, options);
    };
    Api.prototype.put = function (endpoint, body, options) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    Api.prototype.delete = function (endpoint, body, options) {
        return this.http.post(this.url + '/' + endpoint, body, options);
    };
    Api.prototype.patch = function (endpoint, body, options) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    Api = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], Api);
    return Api;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
var Settings = /** @class */ (function () {
    function Settings(storage, defaults) {
        this.storage = storage;
        this.SETTINGS_KEY = '_settings';
        this._defaults = defaults;
    }
    Settings.prototype.load = function () {
        var _this = this;
        return this.storage.get(this.SETTINGS_KEY).then(function (value) {
            if (value) {
                _this.settings = value;
                _this._mergeDefaults(_this._defaults);
            }
            else {
                return _this.setAll(_this._defaults).then(function (val) {
                    _this.settings = val;
                });
            }
        });
    };
    Settings.prototype._mergeDefaults = function (defaults) {
        for (var k in defaults) {
            if (!(k in this.settings)) {
                this.settings[k] = defaults[k];
            }
        }
        return this.setAll(this.settings);
    };
    Settings.prototype.merge = function (settings) {
        for (var k in settings) {
            this.settings[k] = settings[k];
        }
        return this.save();
    };
    Settings.prototype.setValue = function (key, value) {
        this.settings[key] = value;
        return this.storage.set(this.SETTINGS_KEY, this.settings);
    };
    Settings.prototype.setAll = function (value) {
        return this.storage.set(this.SETTINGS_KEY, value);
    };
    Settings.prototype.getValue = function (key) {
        return this.storage.get(this.SETTINGS_KEY)
            .then(function (settings) {
            return settings[key];
        });
    };
    Settings.prototype.save = function () {
        return this.setAll(this.settings);
    };
    Object.defineProperty(Settings.prototype, "allSettings", {
        get: function () {
            return this.settings;
        },
        enumerable: true,
        configurable: true
    });
    Settings = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], Object])
    ], Settings);
    return Settings;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/request-history/request-history.module": [
		576,
		1
	],
	"../pages/user-edit/user-edit.module": [
		577,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 304;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListMasterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_posts_service_posts_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_geofire__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_geofire___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_geofire__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(544);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { UserViewPage } from '../user-view/user-view';


 //I created a geofire.d.ts file in /app folder that's why this works'
//geolocation

var ListMasterPage = /** @class */ (function () {
    function ListMasterPage(postsService, alertCtrl, toastCtrl, navCtrl, actionSheetCtrl, modalCtrl, geolocation) {
        this.postsService = postsService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        this.userPostsLists = [];
        this.listUsersNearby();
        this.getUserLocation();
        this.userProfileLists = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref('users');
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().currentUser.uid;
        //get list of posts on page init
        this.listCategories();
        this.firebaseRef = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref('users-location/');
        this.geoFire = new __WEBPACK_IMPORTED_MODULE_4_geofire___default.a(this.firebaseRef); //this 
    }
    ListMasterPage.prototype.getUserLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            //this updates the current position of the user
            /*var postData = {
               latitude : resp.coords.latitude,
               longitude : resp.coords.longitude
            }*/
            var that = _this;
            _this.geoFire.set(that.userId, [resp.coords.latitude, resp.coords.longitude]).then(function () {
                console.log("Current user " + that.userId + "'s location has been added to GeoFire");
                // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
                // remove their GeoFire entry
                this.firebaseRef.child(this.userId).onDisconnect().remove();
                console.log("Added handler to remove user " + that.userId + " from GeoFire when you leave this page.");
            }).catch(function (error) {
                console.log("Error adding user " + that.userId + "'s location to GeoFire");
            });
            /*
            this.postsService.overwriteAnythingService('/users-location/'+this.userId, postData).then(()=>{
               console.log("location saved");
            }); */
        }).catch(function (error) {
            var that = _this;
            console.log('Error getting location', error);
            var alert = that.alertCtrl.create({
                title: 'Geolocation not available',
                subTitle: 'We have an error getting your location, ensure that your phone\'s GPS is on!',
                buttons: ['OK']
            });
            alert.present();
        });
        var that = this;
        var watch = that.geolocation.watchPosition();
        watch.subscribe(function (data) {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
            /*if(typeof data.coords != "undefined"){
                var postData = {
                   latitude : data.coords.latitude,
                   longitude : data.coords.longitude
                }
            
            
                this.postsService.overwriteAnythingService('/users-location/'+this.userId, postData).then(()=>{
                   console.log("location saved");
                });
            } */
        });
    };
    ListMasterPage.prototype.listUsersNearby = function () {
        var _this = this;
        var that = this;
        var toast = this.toastCtrl.create({
            message: 'Fetching users nearby...',
        });
        toast.present();
        this.postsService.listSomethingOnceService('/serviceProviders').then(function (snapshot) {
            that.userPostsLists.length = null; //so that it ddoesn't repeat the list
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                data['key'] = childSnapshot.id;
                data['profilePic'] = '/assets/img/marty-avatar.png';
                that.userPostsLists.push(data);
            });
            toast.dismiss();
        }, function (error) {
            var toast = _this.toastCtrl.create({
                message: 'Sorry couldnt retrive list, check your internet connection',
                duration: 3000
            });
            toast.present();
        });
    };
    // viewUser(userkKey){
    // 	this.navCtrl.push(UserViewPage, {
    // 		key: userkKey
    // 	});
    // }
    ListMasterPage.prototype.addVacancy = function () {
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Find people within',
            buttons: [
                {
                    text: 'Within Yaba',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                }, {
                    text: 'Within Lagos',
                    handler: function () {
                        console.log('Archive clicked');
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ListMasterPage.prototype.addCategory = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Add New Category',
            message: "",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var postData = {
                            uid: _this.userId,
                            details: {
                                title: data.title
                            }
                        };
                        _this.postsService.addAnythingService('/categories', postData);
                        var toast = _this.toastCtrl.create({
                            message: 'Category was added successfully, pull to refresh',
                            duration: 3500
                        });
                        toast.present();
                        _this.listCategories();
                    }
                }
            ]
        });
        prompt.present();
    };
    ListMasterPage.prototype.listCategories = function () {
        var that = this;
        this.postsService.listSomethingOnceService('/users').then(function (snapshot) {
            //empty this array first to avoid duplication of content when value changes in the database
            //so every time there is a change in the database, empty the array, fetch fresh data from db
            //this is because we are fetching data with on('value') inside listPostService()
            that.userPostsLists.length = 0;
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                data['key'] = childSnapshot.key;
                that.userPostsLists.push(data);
            });
        });
    };
    /**
     * The view loaded, let's query our items for the list
     */
    ListMasterPage.prototype.ionViewDidLoad = function () {
    };
    ListMasterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list-master',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\list-master\list-master.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title> <ion-icon name="code-working"></ion-icon> Professional nearby</ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="addVacancy()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <ion-list>\n\n    <ion-item-sliding *ngFor="let user of userPostsLists">\n\n      <button ion-item (click)="viewUser(user.key)">\n\n        <ion-avatar item-left>\n\n          <img [src]="user.profilePic" />\n\n        </ion-avatar>\n\n        <h2>{{user.first_name}} {{user.last_name}}</h2>\n\n        <p>{{user.city}}, {{user.state}}</p>\n\n        <ion-note item-right *ngIf="user.note">{{user.note}}</ion-note>\n\n      </button>\n\n\n\n     <!-- <ion-item-options>\n\n        <button ion-button color="danger" (click)="deleteItem(user)">\n\n          {{ \'DELETE_BUTTON\' | translate }}\n\n        </button>\n\n      </ion-item-options> -->\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\list-master\list-master.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_posts_service_posts_service__["a" /* PostsService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_posts_service_posts_service__["a" /* PostsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */]])
    ], ListMasterPage);
    return ListMasterPage;
}());

//# sourceMappingURL=list-master.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_posts_service_posts_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_providers__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_serviceRequest__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_edit_user_edit__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__request_history_request_history__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SearchPage = /** @class */ (function () {
    function SearchPage(db, toastCtrl, alertCtrl, postsService, navCtrl, navParams, items, actionSheetCtrl) {
        // db.firestore.settings({ timestampsInSnapshots: true });
        var _this = this;
        this.db = db;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.postsService = postsService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = items;
        this.actionSheetCtrl = actionSheetCtrl;
        this.currentItems = [];
        this.serviceRequest = new __WEBPACK_IMPORTED_MODULE_6__models_serviceRequest__["b" /* ServiceRequest */]();
        this.serviceCategories = [];
        db.collection('/serviceCategory').valueChanges().subscribe(function (data) {
            _this.serviceCategories = data;
        });
    }
    SearchPage.prototype.getServices = function (ev) {
        var val = ev.target.value;
        if (!val || !val.trim()) {
            this.currentItems = [];
            return;
        }
        this.currentItems = this.items.query({
            name: val
        });
    };
    SearchPage.prototype.selectServiceCategory = function () {
        var context = this;
        var actionButtons = [];
        this.serviceCategories.forEach(function (category) {
            actionButtons.push({
                text: category.name,
                role: 'destructive',
                handler: function () {
                    context.selectedCategory = category;
                }
            });
        });
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select service category',
            buttons: actionButtons
        });
        actionSheet.present();
    };
    SearchPage.prototype.selectService = function () {
        var _this = this;
        if (!this.selectedCategory) {
            return;
        }
        var context = this;
        this.db.collection('/serviceCategory').doc(this.selectedCategory.id).collection("services").valueChanges().subscribe(function (data) {
            var actionButtons = [];
            data.forEach(function (service) {
                actionButtons.push({
                    text: service.name,
                    role: 'destructive',
                    handler: function () {
                        context.selectedService = service;
                    }
                });
            });
            var actionSheet = _this.actionSheetCtrl.create({
                title: 'Select Service',
                buttons: actionButtons
            });
            actionSheet.present();
        });
    };
    SearchPage.prototype.requestService = function () {
        var _this = this;
        // check if the user is logged in
        __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                // User is logged in- go to the confirmation page
                _this.saveRequest(user);
            }
            else {
                // User is not logged in- go to the profile page
                var alert_1 = _this.alertCtrl.create({
                    title: 'Login Required',
                    subTitle: 'Creating service request requires authentication. Please login or create a profile',
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: function () {
                                _this.serviceRequest.service = _this.selectedService;
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__user_edit_user_edit__["a" /* UserEditPage */], _this.serviceRequest.service);
                            }
                        }
                    ]
                });
                alert_1.present();
            }
        });
    };
    SearchPage.prototype.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    SearchPage.prototype.saveRequest = function (user) {
        var _this = this;
        // remove fields that are for display purposes
        delete this.selectedService.isActive;
        // set defaults
        this.serviceRequest.requestDate = new Date();
        this.serviceRequest.bookingDate = new Date();
        this.serviceRequest.id = __WEBPACK_IMPORTED_MODULE_6__models_serviceRequest__["a" /* Guid */].newGuid();
        this.serviceRequest.service = this.selectedService;
        this.serviceRequest.user = { 'id': user.uid, 'name': user.email };
        this.db.collection('/serviceRequests').doc(this.serviceRequest.id).set(JSON.parse(JSON.stringify(this.serviceRequest)))
            .then(function (res) {
            // Success
            var alert = _this.alertCtrl.create({
                title: 'Success!',
                subTitle: 'Your request was saved successfully. Go to the request history view to check for progress',
                buttons: ['Dismiss']
            });
            alert.present().then(function (res) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__request_history_request_history__["a" /* RequestHistoryPage */]);
            });
        })
            .catch(function (error) {
            // Error
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Error occurred. Please try again later.',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\search\search.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title></ion-title>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <!-- <ion-card>\n\n    <ion-card-header>\n\n      Search\n\n    </ion-card-header>\n\n    <ion-searchbar (ionInput)="getServices($event)" placeholder="Search for services"></ion-searchbar>\n\n  </ion-card> -->\n\n\n\n  <ion-card>\n\n<!--       \n\n    <ion-card-header>\n\n      Or Select\n\n    </ion-card-header> -->\n\n    <ion-item>\n\n      <div  text-center>\n\n        <button full outline padding ion-button color="primary" (click)="selectServiceCategory()">\n\n          <span *ngIf="!selectedCategory">Select service category</span>\n\n          <span style="color:green" *ngIf="selectedCategory">Service category: {{selectedCategory.name}}</span>\n\n        </button>\n\n      </div>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <div  text-center>\n\n        <button full outline padding ion-button color="primary" (click)="selectService()">\n\n          <span *ngIf="!selectedService">Select service</span>\n\n          <span style="color:green" *ngIf="selectedService">Service: {{selectedService.name}}</span>\n\n        </button>\n\n      </div>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      \n\n        <input style="width: 100%;" [ngModel]="serviceRequest.comment" type="text" placeholder="Comment"/>\n\n        \n\n        <ion-icon item-right name="ios-mic-outline"></ion-icon>\n\n        <ion-icon item-right name="ios-camera-outline"></ion-icon>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <div  text-center>\n\n        <button [disabled]="!selectedService || !selectedCategory" padding ion-button color="gray" (click)="requestService()">Request service</button>\n\n      </div>\n\n    </ion-item>\n\n  </ion-card>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\search\search.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_posts_service_posts_service__["a" /* PostsService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_posts_service_posts_service__["a" /* PostsService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_providers__["a" /* Items */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
var User = /** @class */ (function () {
    function User(http, api) {
        this.http = http;
        this.api = api;
    }
    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    User.prototype.login = function (accountInfo) {
        var _this = this;
        var seq = this.api.post('login', accountInfo).share();
        seq
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                _this._loggedIn(res);
            }
            else {
            }
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    User.prototype.signup = function (accountInfo) {
        var _this = this;
        var seq = this.api.post('signup', accountInfo).share();
        seq
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                _this._loggedIn(res);
            }
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    /**
     * Log the user out, which forgets the session
     */
    User.prototype.logout = function () {
        this._user = null;
    };
    /**
     * Process a login/signup response to store user data
     */
    User.prototype._loggedIn = function (resp) {
        this._user = resp.user;
    };
    User = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__api__["a" /* Api */]])
    ], User);
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Items; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_item__ = __webpack_require__(546);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Items = /** @class */ (function () {
    function Items(http) {
        this.http = http;
        this.items = [];
        this.defaultItem = {
            "name": "Burt Bear",
            "profilePic": "assets/img/speakers/bear.jpg",
            "about": "Burt is a Bear.",
        };
        var items = [
            {
                "name": "Burt Bear",
                "profilePic": "assets/img/speakers/bear.jpg",
                "about": "Burt is a Bear."
            },
            {
                "name": "Charlie Cheetah",
                "profilePic": "assets/img/speakers/cheetah.jpg",
                "about": "Charlie is a Cheetah."
            },
            {
                "name": "Donald Duck",
                "profilePic": "assets/img/speakers/duck.jpg",
                "about": "Donald is a Duck."
            },
            {
                "name": "Eva Eagle",
                "profilePic": "assets/img/speakers/eagle.jpg",
                "about": "Eva is an Eagle."
            },
            {
                "name": "Ellie Elephant",
                "profilePic": "assets/img/speakers/elephant.jpg",
                "about": "Ellie is an Elephant."
            },
            {
                "name": "Molly Mouse",
                "profilePic": "assets/img/speakers/mouse.jpg",
                "about": "Molly is a Mouse."
            },
            {
                "name": "Paul Puppy",
                "profilePic": "assets/img/speakers/puppy.jpg",
                "about": "Paul is a Puppy."
            }
        ];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.items.push(new __WEBPACK_IMPORTED_MODULE_2__models_item__["a" /* Item */](item));
        }
    }
    Items.prototype.query = function (params) {
        if (!params) {
            return this.items;
        }
        return this.items.filter(function (item) {
            for (var key in params) {
                var field = item[key];
                if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
                    return item;
                }
                else if (field == params[key]) {
                    return item;
                }
            }
            return null;
        });
    };
    Items.prototype.add = function (item) {
        this.items.push(item);
    };
    Items.prototype.delete = function (item) {
        this.items.splice(this.items.indexOf(item), 1);
    };
    Items = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], Items);
    return Items;
}());

//# sourceMappingURL=items.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CardsPage = /** @class */ (function () {
    function CardsPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.cardItems = [
            {
                user: {
                    avatar: 'assets/img/marty-avatar.png',
                    name: 'Marty McFly'
                },
                date: 'November 5, 1955',
                image: 'assets/img/advance-card-bttf.png',
                content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
            },
            {
                user: {
                    avatar: 'assets/img/sarah-avatar.png.jpeg',
                    name: 'Sarah Connor'
                },
                date: 'May 12, 1984',
                image: 'assets/img/advance-card-tmntr.jpg',
                content: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.'
            },
            {
                user: {
                    avatar: 'assets/img/ian-avatar.png',
                    name: 'Dr. Ian Malcolm'
                },
                date: 'June 28, 1990',
                image: 'assets/img/advance-card-jp.jpg',
                content: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.'
            }
        ];
    }
    CardsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cards',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\cards\cards.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ \'CARDS_TITLE\' | translate }}</ion-title>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n  <ion-card *ngFor="let item of cardItems">\n\n\n\n    <ion-item>\n\n      <ion-avatar item-left>\n\n        <img [src]="item.user.avatar">\n\n      </ion-avatar>\n\n      <h2>{{item.user.name}}</h2>\n\n      <p>{{item.date}}</p>\n\n    </ion-item>\n\n\n\n    <img [src]="item.image">\n\n\n\n    <ion-card-content>\n\n      <p>{{item.content}}</p>\n\n    </ion-card-content>\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n        <button ion-button color="primary" clear small icon-left>\n\n            <ion-icon name=\'thumbs-up\'></ion-icon>\n\n            12 Likes\n\n          </button>\n\n      </ion-col>\n\n      <ion-col>\n\n        <button ion-button color="primary" clear small icon-left>\n\n            <ion-icon name=\'text\'></ion-icon>\n\n            4 Comments\n\n          </button>\n\n      </ion-col>\n\n      <ion-col center text-center>\n\n        <ion-note>\n\n          11h ago\n\n        </ion-note>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\cards\cards.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], CardsPage);
    return CardsPage;
}());

//# sourceMappingURL=cards.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContentPage = /** @class */ (function () {
    function ContentPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-content',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\content\content.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Content\n\n    </ion-title>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <p>\n\n    This is a perfect starting point for a page with primarily text content. The\n\n    body is padded nicely and ready for prose.\n\n  </p>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\content\content.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], ContentPage);
    return ContentPage;
}());

//# sourceMappingURL=content.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_settings__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_translate_ng2_translate__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, settings, formBuilder, navParams, translate) {
        this.navCtrl = navCtrl;
        this.settings = settings;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.translate = translate;
        this.settingsReady = false;
        this.profileSettings = {
            page: 'profile',
            pageTitleKey: 'SETTINGS_PAGE_PROFILE'
        };
        this.page = 'main';
        this.pageTitleKey = 'SETTINGS_TITLE';
        this.subSettings = SettingsPage_1;
    }
    SettingsPage_1 = SettingsPage;
    SettingsPage.prototype._buildForm = function () {
        var _this = this;
        var group = {
            option1: [this.options.option1],
            option2: [this.options.option2],
            option3: [this.options.option3]
        };
        switch (this.page) {
            case 'main':
                break;
            case 'profile':
                group = {
                    option4: [this.options.option4]
                };
                break;
        }
        this.form = this.formBuilder.group(group);
        // Watch the form for changes, and
        this.form.valueChanges.subscribe(function (v) {
            _this.settings.merge(_this.form.value);
        });
    };
    SettingsPage.prototype.ionViewDidLoad = function () {
        // Build an empty form for the template to render
        this.form = this.formBuilder.group({});
    };
    SettingsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // Build an empty form for the template to render
        this.form = this.formBuilder.group({});
        this.page = this.navParams.get('page') || this.page;
        this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;
        this.translate.get(this.pageTitleKey).subscribe(function (res) {
            _this.pageTitle = res;
        });
        this.settings.load().then(function () {
            _this.settingsReady = true;
            _this.options = _this.settings.allSettings;
            _this._buildForm();
        });
    };
    SettingsPage.prototype.ngOnChanges = function () {
        console.log('Ng All Changes');
    };
    SettingsPage = SettingsPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\settings\settings.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ pageTitle }}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <form [formGroup]="form" *ngIf="settingsReady">\n\n    <ion-list *ngIf="page == \'main\'">\n\n      <ion-item>\n\n        <ion-label>Toggle Danfo</ion-label>\n\n        <ion-toggle formControlName="option1"></ion-toggle>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Change Driver</ion-label>\n\n        <ion-input formControlName="option2"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>{{ \'SETTINGS_OPTION3\' | translate }}</ion-label>\n\n        <ion-select formControlName="option3">\n\n          <ion-option value="1" checked="true">1</ion-option>\n\n          <ion-option value="2">2</ion-option>\n\n          <ion-option value="3">3</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <button ion-item [navPush]="subSettings" [navParams]="profileSettings">\n\n        {{ \'SETTINGS_PROFILE_BUTTON\' | translate }}\n\n      </button>\n\n    </ion-list>\n\n\n\n    <ion-list *ngIf="page == \'profile\'">\n\n      <ion-item>\n\n        <ion-label>{{ \'SETTINGS_OPTION4\' | translate }}</ion-label>\n\n        <ion-input formControlName="option4"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n  </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\settings\settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_settings__["a" /* Settings */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_translate_ng2_translate__["c" /* TranslateService */]])
    ], SettingsPage);
    return SettingsPage;
    var SettingsPage_1;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(369);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* unused harmony export createTranslateLoader */
/* unused harmony export provideSettings */
/* unused harmony export declarations */
/* unused harmony export entryComponents */
/* unused harmony export providers */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_translate_ng2_translate__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_time_ago_pipe__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mocks_providers_items__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_about_about__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_cards_cards__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_contact_contact__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_content_content__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_home__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_item_create_item_create__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_item_detail_item_detail__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_list_master_list_master__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_login_login__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_map_map__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_menu_menu__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_request_history_request_history__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_search_search__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_settings_settings__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_signup_signup__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_tabs_tabs__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_tutorial_tutorial__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_user_edit_user_edit__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_user_view_user_view__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_welcome_welcome__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_api__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_location_tracker__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_settings__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_user__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__app_component__ = __webpack_require__(575);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBME_NQg_eb3tG9T-wmnXOp5MtoLCD5nZQ",
    authDomain: "service-24-6.firebaseapp.com",
    databaseURL: "https://service-24-6.firebaseio.com",
    projectId: "service-24-6",
    storageBucket: "service-24-6.appspot.com",
    messagingSenderId: "81758531362"
};
__WEBPACK_IMPORTED_MODULE_8_firebase__["initializeApp"](firebaseConfig);
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_10_ng2_translate_ng2_translate__["d" /* TranslateStaticLoader */](http, "./assets/i18n", ".json");
}
function provideSettings(storage) {
    /**
     * The Settings provider takes a set of default settings for your app.
     *
     * You can add new settings options at any time. Once the settings are saved,
     * these values will not overwrite the saved values (this can be done manually if desired).
     */
    return new __WEBPACK_IMPORTED_MODULE_35__providers_settings__["a" /* Settings */](storage, {
        option1: true,
        option2: "Ionitron J. Framework",
        option3: "3",
        option4: "Hello"
    });
}
/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
var pages = [
    __WEBPACK_IMPORTED_MODULE_37__app_component__["a" /* MyApp */],
    __WEBPACK_IMPORTED_MODULE_14__pages_cards_cards__["a" /* CardsPage */],
    __WEBPACK_IMPORTED_MODULE_31__pages_user_view_user_view__["a" /* UserViewPage */],
    __WEBPACK_IMPORTED_MODULE_30__pages_user_edit_user_edit__["a" /* UserEditPage */],
    __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
    __WEBPACK_IMPORTED_MODULE_13__pages_about_about__["a" /* AboutPage */],
    __WEBPACK_IMPORTED_MODULE_15__pages_contact_contact__["a" /* ContactPage */],
    __WEBPACK_IMPORTED_MODULE_16__pages_content_content__["a" /* ContentPage */],
    __WEBPACK_IMPORTED_MODULE_21__pages_login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_22__pages_map_map__["a" /* MapPage */],
    __WEBPACK_IMPORTED_MODULE_27__pages_signup_signup__["a" /* SignupPage */],
    __WEBPACK_IMPORTED_MODULE_28__pages_tabs_tabs__["a" /* TabsPage */],
    __WEBPACK_IMPORTED_MODULE_29__pages_tutorial_tutorial__["a" /* TutorialPage */],
    __WEBPACK_IMPORTED_MODULE_32__pages_welcome_welcome__["a" /* WelcomePage */],
    __WEBPACK_IMPORTED_MODULE_20__pages_list_master_list_master__["a" /* ListMasterPage */],
    __WEBPACK_IMPORTED_MODULE_19__pages_item_detail_item_detail__["a" /* ItemDetailPage */],
    __WEBPACK_IMPORTED_MODULE_18__pages_item_create_item_create__["a" /* ItemCreatePage */],
    __WEBPACK_IMPORTED_MODULE_23__pages_menu_menu__["a" /* MenuPage */],
    __WEBPACK_IMPORTED_MODULE_26__pages_settings_settings__["a" /* SettingsPage */],
    __WEBPACK_IMPORTED_MODULE_25__pages_search_search__["a" /* SearchPage */],
    __WEBPACK_IMPORTED_MODULE_24__pages_request_history_request_history__["a" /* RequestHistoryPage */]
];
function declarations() {
    return [
        __WEBPACK_IMPORTED_MODULE_37__app_component__["a" /* MyApp */],
        __WEBPACK_IMPORTED_MODULE_14__pages_cards_cards__["a" /* CardsPage */],
        __WEBPACK_IMPORTED_MODULE_31__pages_user_view_user_view__["a" /* UserViewPage */],
        __WEBPACK_IMPORTED_MODULE_30__pages_user_edit_user_edit__["a" /* UserEditPage */],
        __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
        __WEBPACK_IMPORTED_MODULE_13__pages_about_about__["a" /* AboutPage */],
        __WEBPACK_IMPORTED_MODULE_15__pages_contact_contact__["a" /* ContactPage */],
        __WEBPACK_IMPORTED_MODULE_16__pages_content_content__["a" /* ContentPage */],
        __WEBPACK_IMPORTED_MODULE_21__pages_login_login__["a" /* LoginPage */],
        __WEBPACK_IMPORTED_MODULE_22__pages_map_map__["a" /* MapPage */],
        __WEBPACK_IMPORTED_MODULE_27__pages_signup_signup__["a" /* SignupPage */],
        __WEBPACK_IMPORTED_MODULE_28__pages_tabs_tabs__["a" /* TabsPage */],
        __WEBPACK_IMPORTED_MODULE_29__pages_tutorial_tutorial__["a" /* TutorialPage */],
        __WEBPACK_IMPORTED_MODULE_32__pages_welcome_welcome__["a" /* WelcomePage */],
        __WEBPACK_IMPORTED_MODULE_20__pages_list_master_list_master__["a" /* ListMasterPage */],
        __WEBPACK_IMPORTED_MODULE_19__pages_item_detail_item_detail__["a" /* ItemDetailPage */],
        __WEBPACK_IMPORTED_MODULE_18__pages_item_create_item_create__["a" /* ItemCreatePage */],
        __WEBPACK_IMPORTED_MODULE_23__pages_menu_menu__["a" /* MenuPage */],
        __WEBPACK_IMPORTED_MODULE_26__pages_settings_settings__["a" /* SettingsPage */],
        __WEBPACK_IMPORTED_MODULE_25__pages_search_search__["a" /* SearchPage */],
        __WEBPACK_IMPORTED_MODULE_24__pages_request_history_request_history__["a" /* RequestHistoryPage */],
        __WEBPACK_IMPORTED_MODULE_11_time_ago_pipe__["a" /* TimeAgoPipe */]
    ];
}
function entryComponents() {
    return pages;
}
function providers() {
    return [
        __WEBPACK_IMPORTED_MODULE_34__providers_location_tracker__["a" /* LocationTracker */],
        __WEBPACK_IMPORTED_MODULE_36__providers_user__["a" /* User */],
        __WEBPACK_IMPORTED_MODULE_33__providers_api__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_12__mocks_providers_items__["a" /* Items */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__["b" /* AngularFirestoreModule */],
        { provide: __WEBPACK_IMPORTED_MODULE_35__providers_settings__["a" /* Settings */], useFactory: provideSettings, deps: [__WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]] },
        // Keep this to enable Ionic's runtime error handling during development
        { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["e" /* IonicErrorHandler */] }
    ];
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: declarations(),
            imports: [
                __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_37__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/request-history/request-history.module#RequestHistoryPageModule', name: 'RequestHistoryPage', segment: 'request-history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user-edit/user-edit.module#UserEditModule', name: 'UserEditPage', segment: 'user-edit', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10_ng2_translate_ng2_translate__["b" /* TranslateModule */].forRoot({
                    provide: __WEBPACK_IMPORTED_MODULE_10_ng2_translate_ng2_translate__["a" /* TranslateLoader */],
                    useFactory: createTranslateLoader,
                    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["d" /* IonicApp */]],
            entryComponents: entryComponents(),
            providers: providers()
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
var Item = /** @class */ (function () {
    function Item(fields) {
        this.fields = fields;
        // Quick and dirty extend/assign fields to this model
        for (var f in fields) {
            this[f] = fields[f];
        }
    }
    return Item;
}());

//# sourceMappingURL=item.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ServiceRequest; });
/* unused harmony export IdName */
/* unused harmony export UserNameSurname */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Guid; });
var ServiceRequest = /** @class */ (function () {
    function ServiceRequest() {
        this.bookingDate = null;
        this.comment = null;
        this.location = null;
        this.service = null;
        this.user = null;
        this.requestDate = null;
    }
    return ServiceRequest;
}());

var IdName = /** @class */ (function () {
    function IdName() {
    }
    return IdName;
}());

var UserNameSurname = /** @class */ (function () {
    function UserNameSurname() {
    }
    return UserNameSurname;
}());

var Guid = /** @class */ (function () {
    function Guid() {
    }
    Guid.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
}());

//# sourceMappingURL=serviceRequest.js.map

/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      About\n\n    </ion-title>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Contact\n\n    </ion-title>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n\n    <ion-item>\n\n      <ion-icon name="ionic" item-left></ion-icon>\n\n      @ionicframework\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Home</ion-title>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <h2>Welcome to Ionic!</h2>\n\n  <p>\n\n    This starter project comes with simple tabs-based layout for apps\n\n    that are going to primarily use a Tabbed UI.\n\n  </p>\n\n  <p>\n\n    Take a look at the <code>src/pages/</code> directory to add or change tabs,\n\n    update any existing page or create new pages.\n\n  </p>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(570);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ItemCreatePage = /** @class */ (function () {
    function ItemCreatePage(navCtrl, viewCtrl, formBuilder, camera) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.camera = camera;
        this.cameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.form = formBuilder.group({
            profilePic: [""],
            name: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            about: [""]
        });
        // Watch the form for changes, and
        this.form.valueChanges.subscribe(function (v) {
            _this.isReadyToSave = _this.form.valid;
        });
    }
    ItemCreatePage.prototype.ionViewDidLoad = function () { };
    ItemCreatePage.prototype.getPicture = function () {
        var _this = this;
        if (this.camera["installed"]()) {
            this.camera
                .getPicture({
                targetWidth: 96,
                targetHeight: 96
            })
                .then(function (data) {
                _this.form.patchValue({
                    profilePic: "data:image/jpg;base64," + data
                });
            }, function (err) {
                alert("Unable to take photo");
            });
        }
        else {
            this.fileInput.nativeElement.click();
        }
    };
    ItemCreatePage.prototype.processWebImage = function (event) {
        var _this = this;
        var input = this.fileInput.nativeElement;
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            input.parentNode.removeChild(input);
            var imageData = readerEvent.target.result;
            _this.form.patchValue({ profilePic: imageData });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    ItemCreatePage.prototype.getProfileImageStyle = function () {
        return "url(" + this.form.controls["profilePic"].value + ")";
    };
    /**
     * The user cancelled, so we dismiss without sending data back.
     */
    ItemCreatePage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    /**
     * The user is done and wants to create the item, so return it
     * back to the presenter.
     */
    ItemCreatePage.prototype.done = function () {
        if (!this.form.valid) {
            return;
        }
        this.viewCtrl.dismiss(this.form.value);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("fileInput"),
        __metadata("design:type", Object)
    ], ItemCreatePage.prototype, "fileInput", void 0);
    ItemCreatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-item-create",template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\item-create\item-create.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Add Vacancy</ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button (click)="cancel()">\n\n        <span color="primary" showWhen="ios">\n\n          {{ \'CANCEL_BUTTON\' | translate }}\n\n        </span>\n\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button ion-button (click)="done()" [disabled]="!isReadyToSave" strong>\n\n        <span color="primary" showWhen="ios">\n\n          {{ \'DONE_BUTTON\' | translate }}\n\n        </span>\n\n        <ion-icon name="md-checkmark" showWhen="core,android,windows"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <form *ngIf="form" [formGroup]="form" (ngSubmit)="createItem()">\n\n    <input type="file" #fileInput style="visibility: hidden; height: 0px" name="files[]" (change)="processWebImage($event)"/>\n\n    <div class="profile-image-wrapper" (click)="getPicture()">\n\n      <div class="profile-image-placeholder" *ngIf="!this.form.controls.profilePic.value">\n\n        <ion-icon name="add"></ion-icon>\n\n        <div>\n\n          {{ \'ITEM_CREATE_CHOOSE_IMAGE\' | translate }}\n\n        </div>\n\n      </div>\n\n      <div class="profile-image" [style.backgroundImage]="getProfileImageStyle()" *ngIf="this.form.controls.profilePic.value"></div>\n\n    </div>\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-input type="text" placeholder="{{ \'ITEM_NAME_PLACEHOLDER\' | translate }}" formControlName="name"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-input type="text" placeholder="{{ \'ITEM_ABOUT_PLACEHOLDER\' | translate }}" formControlName="about"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\item-create\item-create.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */]])
    ], ItemCreatePage);
    return ItemCreatePage;
}());

//# sourceMappingURL=item-create.js.map

/***/ }),

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(175);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ItemDetailPage = /** @class */ (function () {
    function ItemDetailPage(navCtrl, navParams, items) {
        this.navCtrl = navCtrl;
        this.item = navParams.get('item') || items.defaultItem;
    }
    ItemDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-item-detail',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\item-detail\item-detail.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ item.name }}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <div class="item-profile" text-center #profilePic [style.background-image]="\'url(\' + item.profilePic + \')\'">\n\n  </div>\n\n\n\n  <div class="item-detail" padding>\n\n    <h2>{{item.name}}</h2>\n\n    <p>{{item.about}}</p>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\item-detail\item-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Items */]])
    ], ItemDetailPage);
    return ItemDetailPage;
}());

//# sourceMappingURL=item-detail.js.map

/***/ }),

/***/ 572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, platform) {
        this.navCtrl = navCtrl;
        this.platform = platform;
    }
    MapPage.prototype.initJSMaps = function (mapEle) {
        new google.maps.Map(mapEle, {
            center: { lat: 43.071584, lng: -89.380120 },
            zoom: 16
        });
    };
    MapPage.prototype.initNativeMaps = function (mapEle) {
        // this.map = new GoogleMap(mapEle);
        // mapEle.classList.add('show-map');
        // GoogleMap.isAvailable().then(() => {
        //   const position = new GoogleMapsLatLng(43.074395, -89.381056);
        //   this.map.setPosition(position);
        // });
    };
    MapPage.prototype.ionViewDidLoad = function () {
        var mapEle = this.map.nativeElement;
        if (!mapEle) {
            console.error('Unable to initialize map, no map element with #map view reference.');
            return;
        }
        // Disable this switch if you'd like to only use JS maps, as the APIs
        // are slightly different between the two. However, this makes it easy
        // to use native maps while running in Cordova, and JS maps on the web.
        if (this.platform.is('cordova') === true) {
            this.initNativeMaps(mapEle);
        }
        else {
            this.initJSMaps(mapEle);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", Object)
    ], MapPage.prototype, "map", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\map\map.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ \'MAP_TITLE\' | translate }}</ion-title>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <div #map id="map"></div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\map\map.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_content__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__content_content__["a" /* ContentPage */];
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Sign in', component: __WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */] },
            { title: 'Signup', component: __WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */] }
        ];
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        console.log('Hello MenuPage Page');
    };
    MenuPage.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"C:\Projects\service-24-6\src\pages\menu\menu.html"*/'<ion-menu [content]="content">\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content> \n\n</ion-menu>\n\n\n\n<ion-nav #content [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Projects\service-24-6\src\pages\menu\menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 574:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationTracker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var LocationTracker = /** @class */ (function () {
    function LocationTracker(http) {
        this.http = http;
        console.log('Hello LocationTracker Provider');
    }
    LocationTracker = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], LocationTracker);
    return LocationTracker;
}());

//# sourceMappingURL=location-tracker.js.map

/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_cards_cards__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_pages__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_request_history_request_history__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_tutorial_tutorial__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_welcome_welcome__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_posts_service_posts_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_providers__ = __webpack_require__(175);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = /** @class */ (function () {
    function MyApp(translate, platform, settings, config, statusBar, splashScreen) {
        // Set the default language for translation strings, and the current language.
        this.pages = [
            { title: "Tutorial", component: __WEBPACK_IMPORTED_MODULE_11__pages_tutorial_tutorial__["a" /* TutorialPage */] },
            { title: "Home", component: __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */] },
            // { title: 'Home', component: HomePage },
            { title: "Request History", component: __WEBPACK_IMPORTED_MODULE_8__pages_request_history_request_history__["a" /* RequestHistoryPage */] },
            { title: "Social", component: __WEBPACK_IMPORTED_MODULE_6__pages_cards_cards__["a" /* CardsPage */] },
            // { title: 'Content', component: ContentPage },
            // { title: 'Login', component: LoginPage },
            // { title: 'Signup', component: SignupPage },
            // { title: 'Map', component: MapPage },
            // { title: 'Master Detail', component: ListMasterPage },
            // { title: 'Menu', component: MenuPage },
            { title: "Settings", component: __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */] },
            // { title: 'Search', component: SearchPage },
            { title: "Log out", component: __WEBPACK_IMPORTED_MODULE_12__pages_welcome_welcome__["a" /* WelcomePage */] }
        ];
        //check logged in status
        var that = this;
        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                that.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */];
            }
            else {
                //this.rootPage = LoginPage;
                that.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_pages__["a" /* FirstRunPage */];
            }
        });
        translate.setDefaultLang("en");
        translate.use("en");
        translate.get(["BACK_BUTTON_TEXT"]).subscribe(function (values) {
            config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "<ion-menu [content]=\"content\">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n      <ion-list>\n        <button menuClose ion-item *ngFor=\"let p of pages\" (click)=\"openPage(p)\">\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n\n  </ion-menu>\n  <ion-nav #content [root]=\"rootPage\"></ion-nav>",
            providers: [__WEBPACK_IMPORTED_MODULE_13__providers_posts_service_posts_service__["a" /* PostsService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_14__providers_providers__["b" /* Settings */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Config */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstRunPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MainPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Tab1Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Tab2Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Tab3Root; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tutorial_tutorial__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_master_list_master__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_view_user_view__ = __webpack_require__(169);





//import { SettingsPage } from './settings/settings';
// The page the user lands on after opening the app and without a session
var FirstRunPage = __WEBPACK_IMPORTED_MODULE_1__tutorial_tutorial__["a" /* TutorialPage */];
// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
var MainPage = __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */];
// The initial root pages for our tabs (remove if not using tabs)
var Tab1Root = __WEBPACK_IMPORTED_MODULE_2__list_master_list_master__["a" /* ListMasterPage */];
var Tab2Root = __WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* SearchPage */];
var Tab3Root = __WEBPACK_IMPORTED_MODULE_4__user_view_user_view__["a" /* UserViewPage */];
//# sourceMappingURL=pages.js.map

/***/ })

},[354]);
//# sourceMappingURL=main.js.map