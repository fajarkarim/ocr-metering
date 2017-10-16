var axios = require('axios')
var fs = require('fs')

var image_uri = '1_strict.jpg'
var config = { headers: {
  'Prediction-Key': '852e4f16cfc245b0b9c28c45b4a0774c',
  'Content-Type': 'application/octet-stream'
  }
}
var config_url =  { headers: {
  'Prediction-Key': '852e4f16cfc245b0b9c28c45b4a0774c',
  'Content-Type': 'application/json'
  }
}

var image_uri = {'Url': `https://firebasestorage.googleapis.com/v0/b/awesome-presentation.appspot.com/o/ocr%2FIMG_20171002_102843_2.jpg?alt=media&token=c3c98544-3c07-46fa-b8c6-35e80f1c3b4f`}

// var image = fs.readFileSync(image_uri)
var comvis_uri_img_uri = `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/4d6a347d-a098-49f4-8dc4-29d7ab0394c9/url?application=json`
var comvis_uri = `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/4d6a347d-a098-49f4-8dc4-29d7ab0394c9/image`

axios.post(comvis_uri_img_uri, {
  Url: 'https://firebasestorage.googleapis.com/v0/b/awesome-presentation.appspot.com/o/ocr%2FIMG_20171002_102843_2.jpg?alt=media&token=c3c98544-3c07-46fa-b8c6-35e80f1c3b4f'
}, {
  headers: {
    'Prediction-Key': '852e4f16cfc245b0b9c28c45b4a0774c'
  }
})
.then(resp => {
  console.log('masukkk')
  console.log(resp.data)
})
.catch(err => {
  console.log('keluarrr error');
  console.log(err.message)
})
