
const axios = require('axios')
var image = process.argv[2] || '1.jpg'

function upload(image_name) {
  const AWS = require('aws-sdk')
  const fs = require('fs')
  let image_loc = `${__dirname}/recog_images/${image_name}`
  let upload_location = `https://s3.amazonaws.com/ocr-qlue/digit_${image_name}`
  let image_base64 = fs.readFileSync(image_loc).toString('base64')
  var s3Bucket = new AWS.S3({params: {Bucket: 'ocr-qlue'}})

  var buf = new Buffer(image_base64.replace(/^data:image\/\w+;base64,/, ""),'base64')
  var data = {
   Key: `digit_${image_name}`,
   Body: buf,
   ContentEncoding: 'base64',
   ContentType: 'image/jpeg'
  };
  s3Bucket.putObject(data, function(err, data){
     if (err) {
       console.log(err);
       console.log('Error uploading data: ', data);
     } else {
       recog(upload_location)
     }
  });
}

function recog (img_url) {
  const comvis_uri = `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/4d6a347d-a098-49f4-8dc4-29d7ab0394c9/url?application=json`
  const config =  {
    headers: {
      'Prediction-Key': '852e4f16cfc245b0b9c28c45b4a0774c'
    }
  }
  var image_uri = { Url: img_url }

  axios.post(comvis_uri, image_uri, config)
  .then(({data}) => {
    console.log(data)
  })
  .catch(err => {
    console.log(err.message)
  })
}

upload(image)
