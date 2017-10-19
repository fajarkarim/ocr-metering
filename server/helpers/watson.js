
var fs = require('fs')
var axios = require('axios')
var request = require('request')

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var watsonConfig = require('../configs/watson_config')

async function recogAllDigits (uncroppedImage, training_id) {
  await crop(uncroppedImage)
  let digits = ['digit_1.jpg', 'digit_2.jpg', 'digit_3.jpg' ,'digit_4.jpg', 'digit_5.jpg', 'digit_6.jpg']
  let result = []
  let accurationSum = 0
  let textResult = []
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i]
    let angka = await recogImage(digit, training_id)
    result.push(angka)
    textResult.push(angka.text)
  }

  result.forEach(r => {
    accurationSum += r.accuration
  })
  let avgAccuration = accurationSum / digits.length
  let finalResult = {text_result: textResult.join(''), accuration: avgAccuration}
  return finalResult
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
    api_key: watsonConfig.api_key,
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

function recogWithFlask(image_file_path) {

  let recog_api_uri = `http://localhost:5000/recog_digits`
  let body_parameters = {
    file_path: image_file_path
  }
  return new Promise((resolve, reject) => {
    request.post({
        url:recog_api_uri, form: body_parameters
    }, function(err,httpResponse,body) {
      err ? reject(err) : resolve(body)
     })
  })
}

async function recogAllWithFlask(uncropped_image) {
  await crop(uncropped_image)
  let digits = ['/home/karim/qlue/ocr-metering/server/digit_1.jpg', '/home/karim/qlue/ocr-metering/server/digit_2.jpg', '/home/karim/qlue/ocr-metering/server/digit_3.jpg' ,'/home/karim/qlue/ocr-metering/server/digit_4.jpg', '/home/karim/qlue/ocr-metering/server/digit_5.jpg', '/home/karim/qlue/ocr-metering/server/digit_6.jpg']  
  let accurationSum = 0
  let textResult = []
  let result = {}

  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i]
    let digitResult = await recogWithFlask(digit)
    let jsonDigitResult = JSON.parse(digitResult)
    accurationSum += jsonDigitResult.accuration
    textResult.push(jsonDigitResult.text)
  }
  let avgAccuration = accurationSum / digits.length
  result.text = textResult.join('')
  result.accuration = avgAccuration

  return result
}

function checkTrainingStatus () {
  var checkTrainUri = `${watsonConfig.uri}${watsonConfig.training_id}?api_key=${watsonConfig.api_key}&version=2016-05-20`
  axios.get(checkTrainUri)
  .then(({data}) => {
    console.log(data)
  })
  .catch(err => console.log(err.message))
}

module.exports = {
  watsonRecog: async function (image) {
    let recogData = recogAllDigits(image, watsonConfig.training_id)
    return recogData
  },
  flaskRecog: async function(image) {
    let recogData = await recogAllWithFlask(image)
    console.log(recogData)
    return recogData
  }
}
