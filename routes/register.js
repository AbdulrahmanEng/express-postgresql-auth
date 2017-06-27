const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/connect');

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register', flash: null });
});

/* POST register. */
router.post('/', function (req, res, next){
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.genSalt(10, function(err, salt) {
    if(err) throw err;
    bcrypt.hash(password, salt, function(err, hash) {
      // Store hash in your password DB. 
      if (err) throw err;
      db.none('INSERT INTO users(username, password, join_date) VALUES ($1, $2, $3);', [username, hash, new Date()])
        .then(() => {
          // success;
          res.redirect('/login');
        })
        .catch(function(error) {
          // error;
          console.error('POSTGRESQL ERROR:', error);
        });
    });
  });
});

module.exports = router;