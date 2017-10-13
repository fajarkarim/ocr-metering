
const Jimp = require('jimp')
const sizeOf = require('image-size')

module.exports = {
  crop: async function (image_uri) {
    var dimensions = sizeOf(image_uri)
    var height = dimensions.height
    var width = dimensions.width
    var width_per_digit = Math.ceil(width / 6)
    var x_per_digit = 0

    for (let i = 0; i < 6; i++) {
      try {
        const image = await Jimp.read(image_uri)
        image.crop(x_per_digit, 0, 124, 200).write(`digit_${i}.jpg`)
        x_per_digit += width_per_digit
      } catch (e) {
        console.log(`fail`)
      }
    }
  }
}
