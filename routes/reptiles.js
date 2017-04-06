var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   console.log('cookies', req.cookies);
   console.log('cookies.token', req.cookies.token);
  res.render('reptiles');
});

module.exports = router;
