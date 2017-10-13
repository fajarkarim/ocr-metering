var Jimp = require('jimp')
var sizeOf = require('image-size')
var image_url = process.argv.slice(2)[0] || '1.jpg'

Jimp.read(image_url)
.then(image => {
  image.autocrop([2, true])
  .write('tes.jpg')
})
