const express = require('express');
const mongoose = require('mongoose');
const Sponsors = require('../model/sponsors');

const router = express.Router();

/* --------------------------- [ Helper Functions ] ------------------------- */
// Create an Event object with given parameters.
function sponsor(name, description, imagePath, link) {
    let id = new Date().valueOf();
    return {
        name: name,
        description: description,
        imagePath: imagePath,
        link: link,
        id: id
    };
};

/* -------------------------- [ Events Routes ] ----------------------------- */
// Get all events.
router.get('/all', (req, res) => {
    console.log("Getting events");

    // Fetch all events from database.
    Sponsors.find().exec()
    .then((data) => {
        console.log("got events");
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({error: err.message});
    })

});

// Add a sponsor.
router.post('/r/add', (req, res) => {
    console.log("Post: Adding sponsor");
    let newSponsor = new sponsor(req.body.name, req.body.description, req.body.imagePath, req.body.link);
    Sponsors.create(newSponsor, (err, sponsor) => {
        if (err) {
            res.status(400).send({error: err.message});
        } else {
            res.status(200).send(sponsor);
        }
    });
});

// Update a sponsor.
router.put('/r/update', (req, res) => {
    Sponsors.findOneAndUpdate({'id': req.body.id}, req.body).exec()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({error: err.message});
    });
});

// Delete a sponsor.
router.delete('/r/delete/:id', (req, res) => {
    console.log(req.params);
    Sponsors.findOneAndRemove({'id': req.params.id})
    .then((data) => res.status(200).send(null))
    .catch((err) => {
        res.status(400).send({error:err.message});
    })

});

module.exports = router;
