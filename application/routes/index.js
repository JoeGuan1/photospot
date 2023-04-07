var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotector').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId } = require('../middleware/postsmiddleware')
var db = require('../config/database');


/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
    res.render('Index',);
});

router.get('/Login', function (req, res, next) {
    res.render('Login');
});

router.get('/Image', function (req, res, next) {
    res.render('Image Post');
});

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId , (req,res,next) => {
    res.render('Image Post', {title: `Post ${req.params.id}`});
});

router.get('/Registration', function (req, res, next) {
    res.render('Registration');
});

router.use('/Post', isLoggedIn)
router.get('/Post', function (req, res, next) {
    res.render('Posting an Image');
});


module.exports = router;
