var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
const fileUpload = require('express-fileupload');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var flash = require('express-flash');
var index = require('./routes/index');
// var admin = require('./routes/admin');
var ejsMate = require('ejs-mate');
var expressValidator = require('express-validator');
var flash = require('flash');

var app = express();
app.use(session({ secret: 'ssshhhhh' }));

// app.use(bodyParser.json());
// app.use(expressValidator());

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());


app.use(flash());
console.log("In App.js");

// view engine setup
app.engine('ejs', ejsMate);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ######## End Access-Control-Allow-Origin ###### //
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://52.14.36.239:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// ######## Start Access-Control-Allow-Origin ###### //
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  res.status(404);
  res.render('404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.status = err.status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
