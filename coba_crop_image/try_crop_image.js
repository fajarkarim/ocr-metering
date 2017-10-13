const Jimp = require('jimp')
const sizeOf = require('image-size')
var image_url = process.argv.slice(2)[0] || '1.jpg'

var dimensions = sizeOf(image_url)
var height = dimensions.height
var width = dimensions.width
var width_per_digit = Math.ceil(width / 6)

async function crop () {
  var x_per_digit = 0
  for (var i = 0; i < 6; i++) {
    const image = await Jimp.read(image_url)
    if(image) {
      image.crop(x_per_digit, 0, 124, 200).write(`digimon_${i}.jpg`)
      x_per_digit += width_per_digit
    }else {
      console.log('fail');
    }
  }
}

crop()
