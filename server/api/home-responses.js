const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const HomeEntries = require('../model/homeentries');

const router = express.Router();

const MISSION = 'mission';
const HIGHLIGHT = 'highlight';

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

/* -------------------------- [ About Routes ] ----------------------------- */
// Get the mission statement for home page.
router.get('/mission/all', (req, res) => {
    HomeEntries.find({'type': MISSION}).exec()
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
router.post('/r/mission/add', (req, res) => {
    let newEntry = new entry(req.body.title, req.body.content, MISSION);
    HomeEntries.create(newEntry, (err, entry) => {
        if(err) {
            res.status(400).send({err: err.message});
        } else {
            res.status(200).send({entry});
        }
    })
});

// Update an About entry.
router.put('/r/any/update', (req, res) => {
    HomeEntries.findOneAndUpdate({'id': req.body.id}, req.body).exec()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({err: err.message});
    })

});

// Get all entries from the About page.
router.get('/highlights/all', (req, res) => {
    HomeEntries.find({'type': HIGHLIGHT}).exec()
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
router.post('/r/highlights/add', (req, res) => {
    let newEntry = new entry(req.body.title, req.body.content, HIGHLIGHT);
    HomeEntries.create(newEntry, (err, entry) => {
        if(err) {
            res.status(400).send({err: err.message});
        } else {
            res.status(200).send({entry});
        }
    })
});

router.delete('/r/highlights/delete/:id', (req, res) => {
    HomeEntries.findOneAndRemove({'id': req.params.id, 'type': HIGHLIGHT})
    .then((data) => res.status(200).send(null))
    .catch((err) => {
        res.status(400).send({error:err.message});
    })
})

module.exports = router;
