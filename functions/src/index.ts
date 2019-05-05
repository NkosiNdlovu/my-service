import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();


exports.newServiceRequestsNotification = functions.firestore
  .document('serviceRequests/{id}')
  .onCreate(async event => {

    const data = event.data();

    const userId = 'nL4MAGJpCYhM33b35y7Up98lhB72';// data.userId;

    // Notification content
    const payload = {
      notification: {
        title: 'New car wash request',
        body: `${data.service.name} has been requested!`,
        icon: 'https://goo.gl/Fz9nrQ'
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('isAdmin', '==', true)


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push(token)
    })

    return admin.messaging().sendToDevice(tokens, payload);

  });


exports.newJobCardAssignedNotification = functions.firestore
  .document('serviceRequests/{id}')
  .onUpdate(async event => {

    // Check if provider changed 
    if (!event.after.data().providerId) {
      // un-assigned
      return null;
    }

    if (event.after.data().providerId === event.before.data().providerId) {
      // unchanged
      return null;
    }

    // Notification content
    const payload = {
      notification: {
        title: 'You have been assigned new job card',
        body: `${event.after.data().service.name} has been requested!`,
        icon: 'https://goo.gl/Fz9nrQ'
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    const devicesRef = db.collection('devices').where('userId', '==', event.after.data().providerId)


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push(token)
    })

    return admin.messaging().sendToDevice(tokens, payload);

  });

  
exports.requestAcknowledgedNotification = functions.firestore
.document('serviceRequests/{id}')
.onUpdate(async event => {

  // Check if provider changed 
  if (!event.after.data().providerId) {
    // un-assigned
    return null;
  }

  if (event.after.data().acknowledgedBy === event.before.data().acknowledgedBy) {
    // unchanged
    return null;
  }

  // Notification content
  const payload = {
    notification: {
      title: 'Your request has been acknowledged',
      body: `${event.after.data().service.name} has been acknowledged!`,
      icon: 'https://goo.gl/Fz9nrQ'
    }
  }

  // ref to the device collection for the user
  const db = admin.firestore()
  const devicesRef = db.collection('devices').where('userId', '==', event.after.data().user.id)

  // get the user's tokens and send notifications
  const devices = await devicesRef.get();

  const tokens = [];

  // send a notification to each device token
  devices.forEach(result => {
    const token = result.data().token;

    tokens.push(token)
  })

  return admin.messaging().sendToDevice(tokens, payload);

});