const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const port = process.env.PORT || 3000;

const index = require('./routes/index');
const profile = require('./routes/profile');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');

app.locals.user = null;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(session({
  secret: 'nebula',
  resave: false,
  saveUninitialized: true
}));


app.use('/', index);
app.use('/profile', profile);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);

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
  res.render('error');
});

app.listen(port, () => console.log(`Express listening at https://localhost:${port}/`));
