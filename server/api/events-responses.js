const express = require('express');
const mongoose = require('mongoose');
const Events = require('../model/events');

const router = express.Router();

/* --------------------------- [ Helper Functions ] ------------------------- */
// Create an Event object with given parameters.
function eventPost(title, date, time, location, content, imageURL, updateTime, link) {
    let id = new Date().valueOf();
    return {
        title: title,
        date: date,
        time: time,
        location: location,
        content: content,
        imageURL: imageURL,
        updateTime: updateTime,
        link: link,
        eventId: id
    };
};

// Comparator for sorting events high to low (descending).
function compareEventDateHigh(eventA, eventB) {
    return eventB.date - eventA.date;
}

/* -------------------------- [ Events Routes ] ----------------------------- */
// Get all events.
router.get('/all', (req, res) => {
    console.log("Getting events");

    let resultsJson = []; // JSON results to send back to client.

    // Fetch all events from database.
    Events.find().exec()
    .then((data) => {
        data.forEach(function(value, index, arr) {
            resultsJson.push(value);
        });
        resultsJson.sort(compareEventDateHigh);
    })
    .then(() => {
        console.log(resultsJson.length);
        res.status(200).send(resultsJson);
    })
    .catch((err) => {
        res.status(400).send({error: err.message});
    })

});

// Get all events that have not happened yet.
router.get('/current', (req, res) => {
    console.log("Getting current events");
    let resultsJson = []; // JSON results to send back to client.

    let currentDate = new Date().valueOf()
    Events.find({'date': {$gte: currentDate}}).exec()
    .then((data) => {
        data.forEach(function(value, index, arr) {
            resultsJson.push(value);
        });
        resultsJson.sort(compareEventDateHigh);
    })
    .then(() => {
        console.log(resultsJson.length);
        res.status(200).send(resultsJson);
    })
    .catch((err) => {
        res.status(400).send({error: err.message});
    })
});

// Get all events that have happened already.
router.get('/past', (req, res) => {
    console.log("Getting past events");
    let resultsJson = []; // JSON results to send back to client.

    let currentDate = new Date().valueOf()
    Events.find({'date': {$lt: currentDate}}).exec()
    .then((data) => {
        data.forEach(function(value, index, arr) {
            resultsJson.push(value);
        });
        resultsJson.sort(compareEventDateHigh);
    })
    .then(() => {
        console.log(resultsJson.length);
        res.status(200).send(resultsJson);
    })
    .catch((err) => {
        res.status(400).send({error: err.message});
    })
});

// Add an event.
router.post('/r/add', (req, res) => {
    console.log("Post: Adding event");
    let updateTime = new Date().valueOf();
    let newEvent = new eventPost(req.body.title, req.body.date, req.body.time, req.body.location, req.body.content, req.body.imageURL, updateTime, req.body.link);
    Events.create(newEvent, (err, eventPost) => {
        if (err) {
            res.status(400).send({error: err.message});
        } else {
            res.status(200).send(eventPost);
        }
    });
});

// Update an event.
router.put('/r/update', (req, res) => {
    req.body.updateTime = new Date().valueOf();
    Events.findOneAndUpdate({'eventId': req.body.eventId}, req.body).exec()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({error: err.message});
    });
});

// Delete an event.
router.delete('/r/delete/:eventId', (req, res) => {
    console.log(req.params);
    Events.findOneAndRemove({'eventId': req.params.eventId})
    .then((data) => res.status(200).send(null))
    .catch((err) => {
        res.status(400).send({error:err.message});
    })

});

module.exports = router;
