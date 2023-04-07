var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const PostError = require('../helpers/error/PostError');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require('../models/Post');

var storage = multer.diskStorage ({
    destination: function(req, file, cb) {
        cb(null, "public/images/uploads");
    },
    filename: function(req,file,cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});

router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileasThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileasThumbnail;
    let title = req.body.title;
    let desc = req.body.description;
    let fk_userid = req.session.userId;

    /*
    do server validation on your own
    not do in video must do on your own
    if any values that used for the insert statement
    are undefined, mysql.query or execute will fail
    with the following error:
    BIND parameters cannot be undefined
    */

    sharp(fileUploaded)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then(()=> {
        return PostModel.create(title, desc, fileUploaded, destinationOfThumbnail, fk_userid)
    })
    .then ((postWasCreated) => {
        if(postWasCreated) {
            req.flash('success', "Your post was created successfully!");
            res.redirect('/');
        }else {
            throw new PostError('Post could not be created!', '/Post', 200);
        }
    })
    .catch((err) => {
        if (err instanceof PostError) {
            errorPrint(err.getMessage());
            req.flash('error', err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL())
        } else {
            next(err);
        }
    })
});
//localhost:3000/posts/search?search=value
router.get('/search', (req, res, next) => {
    let searchTerm = req.query.search;
    if (!searchTerm) {
        res.send ({
            resultsStatus: "info",
            message: "No search term given",
            results: []
        })
    } else {
        PostModel.search(searchTerm)
        .then ((searchResult) => {
            if(searchResult) {
                res.send({
                    resultsStatus:"info",
                    message: `${results.length} results found`,
                    results: searchResult
                })
            } else {
                PostModel.getNRecentPosts(8)
                .then((postResults) => {
                    res.send({
                        resultsStatus: "info",
                        message: "No results where found for your search but here are the 8 most recent posts.",
                        results: postResults
                    });
                })
            }
        })
        .catch((err) => next(err))
    }
})

module.exports = router;