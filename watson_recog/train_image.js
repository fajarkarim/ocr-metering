var request = require('request')
var fs = require('fs')
var formData = {
  '0_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/0_images.zip'),
  '1_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/1_images.zip'),
  '2_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/2_images.zip'),
  '3_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/3_images.zip'),
  '4_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/4_images.zip'),
  '5_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/5_images.zip'),
  '6_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/6_images.zip'),
  '7_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/7_images.zip'),
  '8_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/8_images.zip'),
  '9_positive_examples': fs.createReadStream(__dirname + '/watson_training_images/9_images.zip'),
  'name': 'metering'
};
var watson_recog_api = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classifiers?api_key=21de48ef81fa1138c4db0bd2f9df5ffd528ff9a2&version=2016-05-20'
request.post({url: watson_recog_api, formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
