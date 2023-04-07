var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserModel = require('../models/Users');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
var bcrypt = require("bcrypt");
const {registerValidation, loginValidation} = require('../middleware/validation');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/Registration', registerValidation, (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let cpassword = req.body.password;

//   /**
//    * do server side validation
//    * not done in video must do on your own
//    */

UserModel.usernameExists(username)
.then((userDoesNameExist) => {
  if (userDoesNameExist) {
    throw new UserError(
      "Registration Failed: Username Already exists",
      '/Registration',
      200
      );
  }else {
    UserModel.emailExists(email);
  }
})
.then((emailDoesExist) => {
  if(emailDoesExist) {
    throw new UserError(
      "Registration Failed: Email Already exists",
      '/Registration',
      200
      );
  } else {
    return UserModel.create(username, password, email);
  }
})
.then((createdUserId) => {
  console.log('1');
  if(createdUserId < 0) {
      throw new UserError(
        "Server Error, user could not be created",
        '/Registration',
        500
      ); 
  } else {
      successPrint("User.js --> was created!");
      req.flash('success', 'User account has been made');
      res.redirect("/Login");
  }
})
  .catch((err) => {
    errorPrint("User could not be made!", err);
    if (err instanceof UserError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect('/Registration');
    } else {
      next(err);
   }
  }); 
});

router.post('/Login', (req,res, next) => {
  let username = req.body.username;
  let password = req.body.password;

    /**
   * do server side validation
   * not done in video must do on your own
   */

UserModel.authenticate(username, password)
  .then((loggedUserId) =>{
    if (loggedUserId > 0) {
      successPrint(`User ${username} is logged in`);
      req.session.username = username;
      req.session.userId = loggedUserId ;
      res.locals.logged = true;
      req.flash('success', 'You have been successfully logged in!');
      res.redirect("/");
    } else {
      throw new UserError("Invaild username and/or password!", "/Login", 200);
    }
  })
  .catch((err) => {
    errorPrint ("User login failed!", err);
    res.redirect('/Login');
    if (err instanceof UserError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect('/Login');
    } else {
      next(err);
    }
  })
})

router.post('/Logout',(req, res, next) => {
  req.session.destroy((err)=> {
    if(err) {
      errorPrint('Session could not be destroyed!');
    } else {
      successPrint('Session was destroyed!');
      res.clearCookie('csid');
      res.json({status: "OK", message: "User is logged out"});
    }
  })
});

module.exports = router;
