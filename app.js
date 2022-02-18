const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')
const cookieParser = require("cookie-parser");
const path = require("path");
const createError = require('http-errors');
const logger = require('morgan');
const appRoutes = require('./routes/appRoutes');

// Create express application
const app = express();

// connect to database
mongoose.connect('mongodb://localhost:27017/blog')
.then(() => console.log(`Database connected successfully`))
.catch((err) => console.log("DB Error", err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// Cookie
app.use(cookieParser());

// Session
app.use(
  session({
    key: "user_sid",
    secret: "mySecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 300000,
    },
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  };
  next()
})

// Application routes
app.use("/", appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // res.json({...err})
});

module.exports = app;