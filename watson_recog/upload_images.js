
const fs = require('fs');
const axios = require('axios')
const img = `${__dirname}/1_strict.jpg`

var image_base64 = fs.readFileSync(img).toString('base64')

var firebase = require('firebase')
var gcloud = require('google-cloud');


// firebase.storage().ref()

// var config = {
//   apiKey: "AIzaSyCcfYVFV31_UnKJfBL24uawHGKz_Z26sFE",
//   authDomain: "awesome-presentation.firebaseapp.com",
//   databaseURL: "https://awesome-presentation.firebaseio.com",
//   projectId: "awesome-presentation",
//   storageBucket: "awesome-presentation.appspot.com",
//   messagingSenderId: "1021392727967"
// };
// firebase.initializeApp(config);
//
// var storageRef = firebase.storage().ref(`ocr_trial/${new Date().toLocaleTimeString()}.jpg`)
//
// storageRef.putString(image_base64, 'base64').then(function(snapshot) {
//   console.log(snapshot)
//   console.log('uploaded');
// })

// ref.putString(message, 'base64').then(function(snapshot) {
//   console.log('Uploaded a base64 string!');
// });
