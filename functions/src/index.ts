import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'nkosi05@gmail.com',
      pass: 'memeza'
  }
});

function sendEmail(serviceName) { 
  const mailOptions = {
     from: 'nkosi05@gmail.com', 
      to: 'fyrewash@gmail.com',
      subject: 'New car wash request!!!', 
      html: `<p style="font-size: 16px;">${serviceName} has been requested!</p>
          <br />
          <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
      ` 
  };

  // returning result
  return transporter.sendMail(mailOptions, (error, info) => {
      if(error){
          return error.toString();
      }
      return null;
  });
}

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
        icon: 'https://goo.gl/Fz9nrQ',
        sound: 'default'
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
    });


    const mailOptions = {
     from: 'nkosi05@gmail.com', 
      to: 'fyrewash@gmail.com',
      subject: 'New car wash request!!!', 
      html: `<p style="font-size: 16px;">${data.service.name} has been requested!</p>
          <br />
          <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
      ` 
    };

    // returning result
    transporter.sendMail(mailOptions, (error, info) => {
        // if(error){
        //     return error.toString();
        // }
        // return null;
    });

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
        body: `${event.after.data().service.name} has been assigned to you!`,
        icon: 'https://goo.gl/Fz9nrQ',
        sound: 'default'
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

    const mailOptions = {
     from: 'nkosi05@gmail.com', 
      to: 'fyrewash@gmail.com',
      subject: 'You have been assigned new job card', 
      html: `<p style="font-size: 16px;">You have been assigned new job card</p>
          <br />
          <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
      ` 
    };

    // returning result
    transporter.sendMail(mailOptions, (error, info) => { // 
    });

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
      icon: 'https://goo.gl/Fz9nrQ',
      sound: 'default'
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


exports.requestAssignedToProviderNotification = functions.firestore
.document('serviceRequests/{id}')
.onUpdate(async event => {

  // Check if provider changed 
  if (!event.after.data().providerId) {
    // un-assigned
    return null;
  }

  if (event.after.data().providerId === event.before.data().providerId 
    || event.before.data().providerId === null) {
    // unchanged
    return null;
  }

  // Notification content
  const payload = {
    notification: {
      title: 'Your request has been assigned to a provider',
      body: `${event.after.data().service.name} has been assigned tp provider!`,
      icon: 'https://goo.gl/Fz9nrQ',
      sound: 'default'
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


exports.requestArrivalAtClientNotification = functions.firestore
.document('serviceRequests/{id}')
.onUpdate(async event => {

  // Check if provider changed 
  if (!event.after.data().providerId) {
    // un-assigned
    return null;
  }

  if (event.after.data().provider === null || 
      event.after.data().provider.arrivalTime === event.before.data().provider.arrivalTime) {
    // unchanged
    return null;
  }

  // Notification content
  const payload = {
    notification: {
      title: 'Provider has arrived.',
      body: `${event.after.data().provider.firstName} has arrived!`,
      icon: 'https://goo.gl/Fz9nrQ',
      sound: 'default'
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


exports.requestCompletedAtClientNotification = functions.firestore
.document('serviceRequests/{id}')
.onUpdate(async event => {

  // Check if provider changed 
  if (!event.after.data().providerId) {
    // un-assigned
    return null;
  }

  if (event.after.data().provider === null || 
      event.after.data().provider.completionTime === event.before.data().provider.completionTime) {
    // unchanged
    return null;
  }

  // Notification content
  const payload = {
    notification: {
      title: 'Provider has completed.',
      body: `${event.after.data().provider.firstName} has completed!`,
      icon: 'https://goo.gl/Fz9nrQ',
      sound: 'default'
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