var tesseract = require('node-tesseract');

// Recognize text of any language in any format
let img_url = `https://firebasestorage.googleapis.com/v0/b/awesome-presentation.appspot.com/o/ocr%2Frm-rf.jpg?alt=media&token=3404b5af-3951-46c3-9e9d-5df29b01fa954`

tesseract.process(img_url ,function(err, text) {
  console.log(`------- masukk tesseract`)
    if(err) {
      console.log(`----------- masuk err`)
        console.error(err);
    } else {
        console.log(text);
    }
});
