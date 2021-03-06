var express = require('express');
var router = express.Router();

var firebase = require('../configs/firebase_config.js')
var vision = require('../coba_ocr_gcp.js')
var House = require('../models/house')

router.post('/ocr', function(req, res, next) {
  vision.detectText(req.body.url, function(err, text, apiResponse) {
    if (err) {
      res.status(500).send(err)
    } else {
      let house = new House({
        house: req.body.house,
        images: req.body.url,
        water_meter: 22222
      })
      res.send(text)
    }
  });
})

router.post('/upload', function(req, res) {
  let file = JSON.parse(req.body.file)
  var storageRef = firebase.storage().ref(`ocr/${file.name}`)
  var uploadFile = storageRef.put(file)
  uploadFile.on('state_changed',

    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
      console.log(`uploading ${percentage} %`)
    },
    function error(err) {
      console.log(err)
    },
    function complete () {
      storageRef.getDownloadURL()
      .then(url => {
        console.log(url)
      })
      .catch(err => {
        console.log(err)
      })
    })
  })


module.exports = router;
