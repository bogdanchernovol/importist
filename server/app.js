const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/log.js');
var compress = require('compression');
const session = require('express-session');
const config = require('./config');
const sessionStore = require('./utils/sessionStore')
var Raven = require('./utils/raven');
var mainRoutes = require('./routes/index');

const app = express();

if (process.env.NDOE_ENV !== 'production'){
  require('dotenv').config()
}
//sentry.io
app.use(Raven.requestHandler());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compress()); 

app.use(morgan('dev',{ "stream": logger.stream }));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  key: process.env.SECRET_KEY,
  cookie: config.get('session:cookie'),
  store: sessionStore(session),
  resave: true,
  saveUninitialized: true
}));

mainRoutes(app);

app.use(Raven.errorHandler());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.send('error', {
      message: err.message,
      error: err
  });
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
