import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { ActionSheetController, AlertController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Guid } from '../../models/guid';
import { ServiceRequest } from '../../models/serviceRequest';
import { PostsService } from '../../providers/posts-service/posts-service';
import { RequestHistoryPage } from '../request-history/request-history';
import { UserEditPage } from '../user-profile-edit/user-edit';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',

  providers: [PostsService]
})
export class SearchPage {
  currentItems: any = [];
  item: Observable<any>;
  serviceCategories: Array<any>;
  test: Observable<any[]>;
  selectedCategory: any;
  selectedService: any;
  serviceRequest: ServiceRequest = new ServiceRequest();

  constructor(
    public db: AngularFirestore,
    private alertCtrl: AlertController,
    public postsService: PostsService,
    public navCtrl: NavController,
    public navParams: NavParams,
    // public items: Items,
    public actionSheetCtrl: ActionSheetController) {

    // db.firestore.settings({ timestampsInSnapshots: true });

    this.serviceCategories = [];

    db.collection('/serviceCategory').valueChanges().subscribe((data) => {
      this.serviceCategories = data;
    });
  }

  getServices(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    // this.currentItems = this.items.query({
    //   name: val
    // });
  }

  selectServiceCategory() {
    let context = this;
    let actionButtons = [];

    this.serviceCategories.forEach((category) => {
      actionButtons.push({
        text: category.name,
        role: 'destructive',
        handler: () => {
          context.selectedCategory = category;
        }
      });
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select service category',
      buttons: actionButtons
    });
    actionSheet.present();
  }


  selectService() {

    if(!this.selectedCategory){
      return;
    }

    let context = this;

    this.db.collection('/serviceCategory').doc(this.selectedCategory.id).collection("services").valueChanges().subscribe((data) => {

      let actionButtons = [];

      data.forEach((service: any) => {
        actionButtons.push({
          text: service.name,
          role: 'destructive',
          handler: () => {
            context.selectedService = service;
          }
        });
      });

      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Service',
        buttons: actionButtons
      });
      actionSheet.present();

    });
  }

  requestService(){
    // check if the user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in- go to the confirmation page
        this.saveRequest(user);
      } else {
        // User is not logged in- go to the profile page

        let alert = this.alertCtrl.create({
          title: 'Login Required',
          subTitle: 'Creating service request requires authentication. Please login or create a profile',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                this.serviceRequest.service = this.selectedService;
                this.navCtrl.push(UserEditPage, this.serviceRequest.service);
              }
            }]
        });
        alert.present();
      }

    });
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  saveRequest(user){
    // remove fields that are for display purposes
    delete this.selectedService.isActive;

    // set defaults
    this.serviceRequest.requestDate = new Date();
    this.serviceRequest.bookingDate = new Date();
    this.serviceRequest.id = Guid.newGuid();
    this.serviceRequest.service = this.selectedService;
    this.serviceRequest.user = {'id': user.uid, 'name': user.email};
    
    this.db.collection('/serviceRequests').doc(this.serviceRequest.id).set(JSON.parse( JSON.stringify(this.serviceRequest)))
      .then((res)=>{

        // Success
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Your request was saved successfully. Go to the request history view to check for progress',
          buttons: ['Dismiss']
        });
        alert.present().then((res) => {
          this.navCtrl.push(RequestHistoryPage);
        });
      })
      .catch((error)=>{

        // Error
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Error occurred. Please try again later.',
          buttons: ['Dismiss']
        });
        alert.present();
      })
  }
}
