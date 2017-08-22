const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const News = require('../model/news');

const router = express.Router();

/* --------------------------- [ Helper Functions ] ------------------------- */
// Create a GalleryPost object with given parameters.
function article(title, content, author, imagePath, link, updateTime) {
    let id = Date.now().valueOf();
    return {
        title: title,
        content: content,
        author: author,
        imagePath: imagePath,
        link: link,
        updateTime: updateTime,
        id: id
    };
};

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/news-uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage }).single('article');

/* -------------------------- [ Events Routes ] ----------------------------- */
// Get all news articles.
router.get('/all', (req, res) => {
    News.find().exec()
    .then((data) => {
        console.log(data);
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log("error");
        res.status(400).send({error: err.message});
    })
})

// Add a news article (Does not upload the image).
router.post('/r/add', (req, res) => {
    let updateTime = Date.now().valueOf();
    let newArticle = new article(req.body.title, req.body.content, req.body.author, req.body.imagePath, req.body.link, updateTime);
    News.create(newArticle, (err, article) => {
        if (err) {
            res.status(400).send({error: err.message});
        } else {
            res.status(200).send(article);
        }
    });
})

// Update a news article (DOES NOT upload a new image).
router.put('/r/update', (req, res) => {
    req.body.updateTime = Date.now().valueOf();
    News.findOneAndUpdate({'id': req.body.id}, req.body).exec()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({error: err.message});
    });
});

// Delete image with ID.
router.delete('/r/delete/:id', (req, res) => {
    News.findOneAndRemove({'id': req.params.id})
    .then((data) => {
        // Delete the image file.
        let path = '../../public/'+data.imagePath;
        fs.unlinkSync(require.resolve(path));
        res.status(200).send(null)}
    )
    .catch((err) => {
        res.status(400).send({error:err.message});
    })
})

// Upload image and return filename.
router.post('/r/image/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log("Error uploading image...")
            res.status(400).send({err: err.message});
        } else {
            console.log("Creating new thing...")
            res.status(200).send(req.file.filename);
        }
    })
})

// Delete the image for article.
router.delete('/r/image/delete/:id', (req, res) => {
    News.find({'id': req.params.id}).exec()
    .then((data) => {
        let path = '../../public/'+data.imagePath;
        fs.unlinkSync(require.resolve(path));
        res.status(200).send(data);

        // // Update
        // data.imagePath = null;
        // News.findOneAndUpdate({'id': data.id}, data).exec()
        // .then((data) => {
        //     res.status(200).send(data);
        // })
        // .catch((err) => {
        //     res.status(400).send({error: err.message});
        // });

    })
    .catch((err) => {
        res.status(400).send({error:err.message});
    })
})

module.exports = router;
