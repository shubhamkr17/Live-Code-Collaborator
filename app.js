var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var config = require('./config');

var passport = require('passport');
var session = require('express-session');
require('./passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact');
var authRouter = require('./routes/auth');
var taskRouter = require('./routes/task');
var codeRouter = require('./routes/code');


//connect to database
var options = {
  useNewUrlParser : true,
  useCreateIndex : true
}
mongoose.connect(config.dbConnString,options).then(
  ()=>{
    console.log("Database connected!");
  },
  err => {
    console.log("Could not connect to database!",err);
  }
);

//global models
global.User = require('./models/user');
global.Task = require('./models/task');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(cookieParser());
app.use(session({
  secret : config.sessionKey,
  resave : false,
  saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/',authRouter);
app.use('/',taskRouter);
app.use('/users', usersRouter);
app.use('/contact',contactRouter);

app.use('/api',codeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
