const express = require('express');
const router = express.Router();
const restrict = require('../middleware/restrict');

/* GET profile page. */
router.get('/', restrict, function(req, res, next) {
    res.render('profile', {
      title: 'Profile',
      flash:null,
      user: req.session.user
    });
});

module.exports = router;