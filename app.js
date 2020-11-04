global.__basedir = __dirname;
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const mongoose = require('mongoose');
const config = require('./config/dbconfig');

const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const winston = require('./config/winston');

const indexRouter = require('./routes/index');
const fbRouter = require('./routes/fb');
const adminRouter = require('./routes/admin');
const mainRouter = require('./routes/main');
const apiRouter = require('./routes/api');

const User = require('./models/user');

const app = express();

const FACEBOOK_APP_ID = '567491550419839';
const FACEBOOK_APP_SECRET = '1d95d9f1c7e011c42692c600a634fc52';

const SESSION_SECRET_KEY = 'test_secret';

mongoose.connect(config.mongodb.dsn, {useNewUrlParser: true}).then(() => {
  console.log('Successfully connected to Mongodb');
});

app.use(helmet());
app.use(require('express-session')({
  secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined', { stream: winston.stream }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

// Define 'global' template variables here
app.use(async (req, res, next) => {
  // To show the application name on the page
  res.locals.applicationName = config.applicationName;

  // Set up flash messaging
  if (!req.session.messages) {
    req.session.messages = [];
  }

  res.locals.messages = req.session.messages;
  return next();
});

app.use(passport.initialize());
app.use(passport.session());  //세션 유지

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/fb', fbRouter);
// app.use('/admin', adminRouter);
app.use('/api', apiRouter);

// serialize
// 인증후 사용자 정보를 세션에 저장
passport.serializeUser(function(user, done) {

  winston.debug('serialize user: ', user);

  done(null, user.id);

});

// deserialize
// 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
// passport.deserializeUser(function(user, done) {
passport.deserializeUser(function(id, done) {
  console.log('deserialized user: ',id);
  User.findById(id, function (err, user) {
    winston.debug('user: ', user.facebook.name);
    done(null, user);
  });
});

// passport setup
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/fb/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('GET accessToken : ', accessToken);
    console.log('GET profile.id: ', profile.id);
    
    // 유저 확인
    User.findOne({'facebook.id': profile.id},(err,user)=>{
      if(err) return done(err);
      if(user) {
        return done(null,user);  //회원 정보가 있으면 로그인
      } else {  //회원 정보가 없으면 생성
        // if there is no user found with that facebook id, create them
        var newUser = new User();

        // set all of the facebook information in our user model
        newUser.facebook.id = profile.id;
        newUser.facebook.accessToken = accessToken;
        newUser.facebook.refreshToken = refreshToken;
        newUser.facebook.name = profile.displayName;

        if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
          newUser.facebook.email = profile.emails[0].value;
        
        // save our user to the database
        newUser.save(function(err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });
  })
);

// var isAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.redirect('/fb');
// };

// app.use(isAuthenticated);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
