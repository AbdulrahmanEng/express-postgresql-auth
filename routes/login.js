const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/connect');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' , flash:null});
});

/* POST login. */
router.post('/', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  db.any('SELECT * FROM users WHERE username = $1', [username])
    .then(function(data) {
      // success;
      const row = data[0];
      if (row === undefined) {
        res.render('login', {
          title: 'Log In',
        flash: {
          message: 'User not found'
        }
      });
      }
      else {
        bcrypt.compare(password, row.password, function(err, result) {
          if(err){
             throw err;
          }
          if (result === true) {
            req.session.user = {username:row.username, join_date:row.join_date};
            const user = req.session.user;
            req.app.locals.user = user;
            res.render('index', {title:'Express', flash: {message: `Hello ${user.username}.`}});
          }
          else {
            res.render('login', {title:'Log In', flash: {message:'Incorrect username or password!'}});
          }
        });
      }
    })
    .catch(function(error) {
      // error;
      console.log('POSTGRESQL ERROR:', error);
    });
});

module.exports = router;