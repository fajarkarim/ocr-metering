
var fs = require('fs');
var axios = require('axios')

var arg = process.argv.slice(2)
var option = arg[0]
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var api_key = require('./watson-config/watson_api')

switch (option) {
  case 'crop':
    var cropImage = arg[1] || '1_strict.jpg'
    crop(cropImage)
    break
  case 'status':
    var training_id = arg[1] || `metering_93837125`
    checkTrainingStatus(training_id)
    break;
  case 'recog':
    var uncroppedImage = arg[1] || '1_strict.jpg'
    var training_id = arg[2] || `metering_93837125`
    async function recog (uncroppedImage, training_id) {
      await crop(uncroppedImage)
      let digits = ['digit_1.jpg', 'digit_2.jpg', 'digit_3.jpg' ,'digit_4.jpg', 'digit_5.jpg', 'digit_6.jpg']
      let result = []
      let textResult = []
      for (let i = 0; i < digits.length; i++) {
        let digit = digits[i]
        let angka = await recogImage(digit, training_id)
        result.push(angka)
        textResult.push(angka.text)
      }
      result.push({text_result: textResult.join('')})
      console.log(result)
    }
    recog(uncroppedImage, training_id)
    break;
  default:
    console.log('status for checking training status')
    console.log('recog for recog the image file');
    break;
}

async function crop (uncropped_image) {
  const Jimp = require('jimp')
  const sizeOf = require('image-size')

  var dimensions = sizeOf(uncropped_image)
  var height = dimensions.height
  var width = dimensions.width
  var width_per_digit = Math.ceil(width / 6)

  var x_per_digit = 0
  for (var i = 0; i < 6; i++) {
    const image = await Jimp.read(uncropped_image)
    if(image) {
      image.crop(x_per_digit, 0, width_per_digit, height).write(`digit_${i+1}.jpg`)
      x_per_digit += width_per_digit
    }else {
      console.log('fail');
    }
  }
}

function recogImage(image_file, training_id) {
  var visual_recognition = new VisualRecognitionV3({
    api_key: api_key,
    version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
  });

  var params = {
    images_file: fs.createReadStream(image_file),
    "classifier_ids": training_id
  };

  return new Promise((resolve, reject) => {
    visual_recognition.classify(params, function(err, res) {
      if (err) {
        reject(err)
      }
      else {
        let classes = res.images[0].classifiers[0].classes
        let maxAccuration = Math.max(...Array.from(classes, c => c.score))
        console.log('fetching to api.... recognizing.....')
        let maxClass = classes.find(c => c.score === maxAccuration)
        resolve({text: maxClass.class, accuration: maxAccuration})
      }
    });
  })
}

function checkTrainingStatus (trainingID) {
  var checkTrainUri = `https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classifiers/${trainingID}?api_key=21de48ef81fa1138c4db0bd2f9df5ffd528ff9a2&version=2016-05-20`
  axios.get(checkTrainUri)
  .then(({data}) => {
    console.log(data)
  })
  .catch(err => console.log(err.message))
}
