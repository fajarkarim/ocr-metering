
var Jimp = require("jimp");
var img_url = `https://firebasestorage.googleapis.com/v0/b/awesome-presentation.appspot.com/o/ocr%2Fimage%20(4).jpg?alt=media&token=7ffea1c7-00b0-43ba-89ed-a562919c9f74`

// open a file called "lenna.png"
Jimp.read(img_url, function (err, lenna) {
    if (err) throw err;
    lenna.quality(90)
    .grayscale()
    .write("manipulated.jpg"); // save
});
