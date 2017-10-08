
var gcloudKey = './ocr-qlue-5ba9c0f19369'

var gcloud = require('google-cloud')({
  keyFilename: gcloudKey,
  projectId: 'ocr-qlue'
});
var vision = gcloud.vision();

module.exports = vision
