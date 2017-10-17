
var uri = `http://localhost:3000/api/images/upload_crop_watson`
var imagePath = `${__dirname}/4_cropped.jpg`

var request = require('request')
var fs = require('fs')
var formData = {
  'image': fs.createReadStream(imagePath)
};

request.post({url: uri, formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
