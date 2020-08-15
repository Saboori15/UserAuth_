var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var multer = require('multer');
var upload=multer({dest:'./uploads'});
var mongo=require('mongodb');
var mongoose=require('mongoose');
var flash =require('connect-flash');
//var expressValidator= require('express-validator');
const { body, validationResult } = require('express-validator');
var db=mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//File uploads


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Handle sessions

app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use('/user', [
  // username must be an email
  body('username').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }});

 app.use(require('connect-flash')());
 app.use(function (req, res, next) {
   res.locals.messages = require('express-messages')(req, res);
   next();
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;