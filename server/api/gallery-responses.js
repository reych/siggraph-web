const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const GalleryPosts = require('../model/galleryposts');

const router = express.Router();

/* --------------------------- [ Helper Functions ] ------------------------- */
// Create a GalleryPost object with given parameters.
function galleryPost(title, eventName, date, caption, imageURL) {
    let id = Date.now().valueOf();
    return {
        title: title,
        eventName: eventName,
        date: date,
        caption: caption,
        imageURL: imageURL,
        id: id
    };
};

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/gallery-uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage }).single('photo');

/* -------------------------- [ Events Routes ] ----------------------------- */
// Get all gallery posts.
router.get('/all', (req, res) => {
    GalleryPosts.find().exec()
    .then((data) => {
        console.log(data);
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log("error");
        res.status(400).send({error: err.message});
    })
})

// Add a gallery post (Does not upload the image).
router.post('/add', (req, res) => {
    let newGalleryPost = new galleryPost(req.body.title, req.body.eventName, req.body.date, req.body.caption, req.body.imageURL);
    GalleryPosts.create(newGalleryPost, (err, galleryPost) => {
        if (err) {
            res.status(400).send({error: err.message});
        } else {
            res.status(200).send(galleryPost);
        }
    });
})

// Upload image and create a GalleryPost object.
router.post('/image/upload', (req, res) => {
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

// Update a gallery post (DOES NOT upload a new image).
router.put('/update', (req, res) => {
    GalleryPosts.findOneAndUpdate({'id': req.body.id}, req.body).exec()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({error: err.message});
    });
});

// Delete image with ID.
router.delete('/delete/:id', (req, res) => {
    // TODO: Delete image at imageURL from uploads too.
    // TODO: Does this _id really work?
    GalleryPosts.findOneAndRemove({'id': req.params.id})
    .then((data) => {
        // Delete the image file.
        let path = '../../public/'+data.imageURL;
        fs.unlinkSync(require.resolve(path));
        res.status(200).send(null)}
    )
    .catch((err) => {
        res.status(400).send({error:err.message});
    })
})

module.exports = router;
