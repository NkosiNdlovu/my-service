import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { ServiceRequest } from '../../models/serviceRequest';
import { UserService } from '../../providers/users-service/users-service';
import { ServiceSelectionPage } from '../service-selection/service-selection';

@Component({
  selector: 'page-request-count-down',
  templateUrl: 'request-count-down.html',
})
export class RequestCountDownPage {
  serviceRequests: Array<ServiceRequest>;
  userId: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public userService: UserService,
    public db: AngularFirestore
  ) {
    this.serviceRequests = [];
    this.userId = userService.currentUserId;
  }

  ionViewDidLoad() {
    this.db
      .collection("/serviceRequests", ref => 
        ref
        .where("user.id", "==", this.userId)
        .where("bookingDate", ">=", new Date().toISOString().substring(0,10))
        .orderBy("bookingDate", "desc")
        )
      .valueChanges()
      .subscribe((data: Array<ServiceRequest>) => {
        this.serviceRequests = data;
      });
  }

  getTransactionNumber(serviceRequest){
    let id : string;
    id= serviceRequest.id;
    return id.substring(0,8).toUpperCase();
  }

  loadAction(serviceRequest) {
    const that = this;

    let actionButtons = [];

    actionButtons.push({
      text: "Cancel request",
      role: "destructive",
      handler: () => {
        that.cancelRequest(serviceRequest);
      }
    });

    
    let actionSheet = this.actionSheetCtrl.create({
      title: "Actions",
      buttons: actionButtons
    });
    actionSheet.present();
  }
  
  requestCarWash(){
    this.navCtrl.setRoot(ServiceSelectionPage);
  }

  getSelectedOptions(job) {
    if(!job.addedOptions){
      return "";
    }
    return job.addedOptions.map(o => o.name).join(", ");
  }

  cancelRequest(serviceRequest){

  }
}
