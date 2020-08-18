var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload=multer({dest:'./uploads'});
const { body, validationResult } = require('express-validator');
var name,email,username,password,confirmpassword,profileimage;
var flash = require('connect-flash');
var user=require('../models/user');

//router.use(flash());

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

router.post('/Register',upload.single('profileimage'), function(req, res, next) {
  name=req.body.name;
  email= req.body.email;
  username=req.body.username;
  password=req.body.password;
  confirmpassword=req.body.confirmpassword;
  if(req.file){
    var profileimage=req.file.filename;
    console.log('File uploading...');
    //console.log(body('confirmpassword').equals(body('password')));
  
  }
  else{
    var profileimage= 'noimage.jpg';
    console.log('No file chosen!');
  }

  next();
  
},[
  //name field must not be empty
  body('name').not().isEmpty().withMessage('Name is empty'),
  //name field must not be empty
  body('email').not().isEmpty().withMessage('Email is empty'),
  //name field must not be empty
  body('username').not().isEmpty().withMessage('Username is empty'),
  //name field must not be empty
  body('password').not().isEmpty().withMessage('Password is empty'),
  //name field must not be empty
  body('confirmpassword').custom((value,{req, loc, path}) => {
    if (value !== password) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match");
    } else {
        return value;
    }
}).withMessage('Passwords dont match'),
  // username must be an email
  body('email').isEmail().withMessage('Enter a proper email'),
 // password must be at least 5 chars long
 //body('password').isLength({ min: 5 }.withMessage('Password must be atleast 5 chars long!'))
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  var errorArray=errors.array();
  if (!errors.isEmpty()) {
   res.render('Register', {
     errors:errors,
     errorArray:errorArray
    });
    //return res.status(400).json({ errors: errors.array() });
  }
  else{
    var newUser =new user({
      name:name,
      email:email,
      username:username,
      password:password,
      profileimage:profileimage
    });

    user.createUser(newUser,function(err,user){
      if(err) throw err;
      console.log(user);
    });
    req.flash("Success","You are registered, feel free to login!");

    res.location('/');
    res.redirect('/');
  }
});

module.exports = router;

//Validator
//app.post('/Register', );