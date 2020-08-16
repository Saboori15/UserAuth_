var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('respond with a resource');
});
router.get('/Register', function(req, res, next) {
  res.render('Register',{title:'Register'});
});
router.get('/Login', function(req, res, next) {
  res.render('Login', {title:'Login'});
});

module.exports = router;
