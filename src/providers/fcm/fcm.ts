import { Firebase } from '@ionic-native/firebase';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';


@Injectable()
export class FcmWashProvider {

  constructor(
    public fcm: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
  ) { }

  // Get permission from the user
  async getToken(profile) {
    
    let that = this;

    if (!this.platform.is('android')) { return };

    this.fcm.getToken()
      .then((token: string) => { 
        
        that.saveTokenToFirestore(token, profile)
       })
      .catch(error => alert('Error getting token' + error));

    this.fcm.onNotificationOpen()
      .subscribe(data => alert(`User opened a notification ${data}`));

    this.fcm.onTokenRefresh()
      .subscribe((token: string) => {
        
        that.saveTokenToFirestore(token, profile)
      });
      
  }

  // Save the token to firestore
  private saveTokenToFirestore(token, profile) {
    if (!token) token = 'no_token';
    
    const devicesRef = this.afs.collection('devices')

    const docData = {
      token,
      userId: profile.id,
      isAdmin: profile.roles ? profile.roles.admin : false,
      isProvider: profile.roles ? profile.roles.provider : false,
      isUser: profile.roles ? profile.roles.user : false,
    }
    
    return devicesRef.doc(token).set(docData)
  }
}
