//
// var axios = require('axios')
//
// axios.post(`http://localhost:5000/recog_digits`, {
//   file_path: '/home/karim/qlue/ocr-metering/server/digit_1.jpg'
// })
// .then(({data}) => {
//   console.log(data)
// })
// .catch(err => {
//   console.log(err.message)
// })


var request = require('request')
// request.post('http://service.com/upload').form({key:'value'})
request.post({
    url:'http://localhost:5000/recog_digits', form: {
    file_path:'/home/karim/qlue/ocr-metering/server/digit_1.jpg'
  }
}, function(err,httpResponse,body){ err ? console.log(err) : console.log(body) })
