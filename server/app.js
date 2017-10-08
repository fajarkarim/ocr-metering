var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var compression = require('compression')
var mongoose = require('mongoose')
require('dotenv').config()
var multer  = require('multer')

var index = require('./routes/index');
var users = require('./routes/users');
var images = require('./routes/images')

var app = express();

var upload = multer({ dest: 'uploads/' })

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(compression())

app.use('/', index);
app.use('/api/images', images)
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

let db_url_dev = `mongodb://localhost:27017/ocr_sample`

mongoose.connect(db_url_dev, err => {
  err ? console.log(err) : console.log('database connected')
})

module.exports = app;
