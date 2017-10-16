const AWS = require('aws-sdk')
const bucket_name = 'ocr-qlue'
var s3Bucket = new AWS.S3({params: {Bucket: bucket_name}})
s3Bucket.listObjects({}, (err, data) => {
  if (err) {
    console.log(err)
    return
  } else {
    var items = data.Contents
    items.forEach(item => {
      var params = {Bucket: bucket_name, Key: item.Key}
      s3Bucket.deleteObject(params, (err,data) => {
        err ? console.log(err) : console.log('deleted')
      })
    })
  }
})
