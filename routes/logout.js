const express = require('express');
const router = express.Router();

/* GET logout. */
router.get('/', function(req, res, next) {
  req.session.destroy((error) => {
    if(error){
      throw error;
    }
    res.redirect('/login');
  });
  
});

module.exports = router;