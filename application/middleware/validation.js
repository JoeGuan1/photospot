var bcrypt = require("bcrypt");
const UserModel = require('../models/Users');
var db = require('../config/database');


const checkUsername = (username) => {
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
}
// const checkPassword = (password) => {
//     let passwordChecker = /\d\[A-Z]\(?=[*+!@#$\^&-]{1,}\w{8,}$/;
//     return passwordChecker.test(password);
// }
const checkEmail = (email) => {
    let emailChecker = /^\S+@\S+\.\S+$/;
    return emailChecker.test(email);

}

const registerValidation = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if(!checkUsername(username)) {
        req.flash('error', "Invalid username!");
        req.session.save(err => {
            res.redirect('/Registration');
        });
    } 
    // else if(!checkPassword(password)) {
    //     req.flash('error', "Invalid password!");
    //     req.session.save(err => {
    //         res.redirect("/Registration");
    //     });
    //}
    else if(!checkEmail(email)) {
        req.flash('error', "Invalid email!");
        req.session.save(err => {
            res.redirect("/Registration");
        });
    } 
    else {
        next();
    }
}

const loginValidation = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if(username != req.session.username) {
            req.flash('error', "Invalid username!");
            req.session.save(err => {
            res.redirect('/Login');
        });
    }

    if(bcrypt.compare(password, req.session.password)){
            req.flash('error', "Invalid password!");
            req.session.save(err => {
            res.redirect("/Login");
        });
    }

}

const postValidation = (req, res, next) => {

}

module.exports = {registerValidation, loginValidation}