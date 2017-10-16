
const axios = require('axios')
const AWS = require('aws-sdk')
AWS.config.setPromisesDependency(Promise);
const fs = require('fs')

const Jimp = require('jimp')
const sizeOf = require('image-size')
var image_url = process.argv.slice(2)[0] || '1_strict.jpg'

var dimensions = sizeOf(image_url)
var height = dimensions.height
var width = dimensions.width
var width_per_digit = Math.ceil(width / 6)

//setup recog
const comvis_uri = `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/47d669e6-5024-4d0a-9dfb-b564f954ca89/url`
const config =  {
  headers: {
    'Prediction-Key': '852e4f16cfc245b0b9c28c45b4a0774c'
  }
}

async function crop () {
  try {
    var result = []
    var x_per_digit = 0
    for (var i = 0; i < 6; i++) {
      const image = await Jimp.read(image_url)
      if(image) {
        let perjanjian = new Promise((resolve, reject) => {
          image.crop(x_per_digit, 0, width_per_digit, height).getBase64('image/jpeg', function(err, data) {
            if(err){
              reject(err)
            }else {
              resolve(data)
            }
          })
        })

        let hasilPerjanjian = await perjanjian
        // console.log(hasilPerjanjian);
        if(hasilPerjanjian){
          let upload_location = `https://s3.amazonaws.com/ocr-qlue/digit_${i}.jpg`
          var s3Bucket = new AWS.S3({params: {Bucket: 'ocr-qlue'}})
          var buf = new Buffer(hasilPerjanjian.replace(/^data:image\/\w+;base64,/, ""),'base64')
          var params = {
           Key: `digit_${i}.jpg`,
           Body: buf,
           ContentEncoding: 'base64',
           ContentType: 'image/jpeg'
          };
          var putObjectPromises = await s3Bucket.putObject(params).promise()
          if(putObjectPromises){
            var image_uri = { Url: upload_location }

            let recog_result = await axios.post(comvis_uri, image_uri, config)
            if(recog_result){
                console.log({'Angka' : recog_result.data.Predictions[0].Tag, 'akurasi': recog_result.data.Predictions[0].Probability });
                result.push(recog_result.data.Predictions[0].Tag)
            }else {
                console.log('recog fail');
            }
          }else {
            console.log('upload gagal');
          }
        }else {
          console.log('crop gagal');
        }
        x_per_digit += width_per_digit
      }else {
        console.log('fail');
      }
    }
    console.log('Your Water Meter: ', result.join(''));
  } catch (e) {
      console.log(e.message);
  }
}

crop()



function upload(image_name) {
  const AWS = require('aws-sdk')
  const fs = require('fs')
  let image_loc = `${__dirname}/${image_name}`
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
  // s3Bucket.putObject(data, function(err, data){
  //    if (err) {
  //      console.log(err);
  //      console.log('Error uploading data: ', data);
  //    } else {
  //      recog(upload_location)
  //    }
  // });

  var putObjectPromises = s3Bucket.putObject(data).promise()
  putObjectPromises
  .then( data => {
    recog(upload_location);
  })
  .catch((err) => {
    console.log('error upload');
  })
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
    console.log(data.Predictions[0].Tag)
  })
  .catch(err => {
    console.log(err.message)
  })
}
