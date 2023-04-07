var express = require('express');
var router = express.Router();
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
var db = require('../config/database');
const { create } = require('../models/Comments');

router.post('/create', (req, res, next) => {
    if(!req.session.username) {
        errorPrint("Must be logged in to comment");
        req.json({
            code: -1,
            status: "danger",
            message: "Must be logged in to create a comment!"
        });
    } else {
        let {comment, postId} =req.body;
        let username = req.session.username;
        let userId = req.session.userId;

        create (userId, postId, comment)
        .then((wasSuccessful) => {
            if(wasSuccessful != -1) {
                successPrint(`Comment was created for ${username}`);
                res.json({
                    code: 1,
                    status: "success",
                    messaage: "comment created",
                    comment: comment,
                    username: username
                })
            }else {
                errorPrint('Comment was not saved');
                req.json({
                code: -1,
                status: "danger",
                message: "Comment was not created!"
                })
            }
        }).catch((err) => next(err));
    }   
})

module.exports = router;