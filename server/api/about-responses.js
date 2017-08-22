const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const Entries = require('../model/entries');
const People = require('../model/people');

const router = express.Router();

const ABOUT_TYPE = 'about';
/* --------------------------- [ Helper Functions ] ------------------------- */
// Helper to create new Entry.
function entry(title, content, type) {
    let id = new Date().valueOf();
    return {
        title: title,
        content: content,
        type: type,
        id: id
    }
}

function person(name, year, major, position, quote, imageURL) {
    let id = new Date().valueOf();
    return {
        name: name,
        year: year,
        major: major,
        position: position,
        quote: quote,
        imageURL: imageURL,
        id: id
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/profile-uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage }).single('profile');

/* -------------------------- [ About Routes ] ----------------------------- */
// Get all entries from the About page.
router.get('/entries/all', (req, res) => {
    Entries.find({'type': ABOUT_TYPE}).exec()
    .then((data) => {
        console.log(data);
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log("error");
        res.status(400).send({error: err.message});
    })
});

// Add an entry, each entry is an object.
router.post('/r/entry/add', (req, res) => {
    let newEntry = new entry(req.body.title, req.body.content, ABOUT_TYPE);
    Entries.create(newEntry, (err, entry) => {
        if(err) {
            res.status(400).send({err: err.message});
        } else {
            res.status(200).send({entry});
        }
    })
});

// Update an About entry.
router.put('/r/entry/update', (req, res) => {
    Entries.findOneAndUpdate({'id': req.body.id}, req.body).exec()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({err: err.message});
    })

});

// Get all people. Return array of Person JSONs.
router.get('/people/all', (req, res) => {
    People.find().exec()
    .then((data) => {
        //console.log(data);
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({err:err.message});
    })
})

// Add a person.
router.post('/r/person/add', (req, res) => {

    let newPerson = new person(req.body.name, req.body.year, req.body.major,
        req.body.position, req.body.quote, req.body.imageURL);
        People.create(newPerson, (err, person) => {
            if(err) {
                res.status(400).send({err: err.message});
            } else {
                res.status(200).send({person});
            }
        })
})

// Update a person.
router.put('/r/person/update', (req, res) => {
    //let imageURL = uploadImage(req.body.imageURL);
    //req.body.imageURL = imageURL;
    People.findOneAndUpdate({'id': req.body.id}, req.body).exec()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({err: err.message});
    })
})

router.delete('/r/person/delete/:id', (req, res) => {
    People.findOneAndRemove({'id': req.params.id})
    .then((data) => {
        if(data.imageURL != null) {
            let path = '../../public/'+data.imageURL;
            fs.unlinkSync(require.resolve(path));
        }
        res.status(200).send(null)
    })
    .catch((err) => {
        res.status(400).send({error:err.message});
    })
})

// Upload an image and send back the filename.
router.post('/r/image/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log("Error uploading image...")
            res.status(400).send({err: err.message});
        } else {
            console.log("Uploaded image...")
            res.status(200).send(req.file.filename);
        }
    })
})

// Delete an image.
router.delete('/r/image/delete/:id', (req, res) => {
    // Delete existing profile picture.
    People.findOne({'id': req.params.id}).exec()
    .then((data) => {
        let path = '../../public/'+data.imageURL;
        fs.unlinkSync(require.resolve(path));
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({err: err.message});
    })


    if(path != null) {

    }
})

module.exports = router;
