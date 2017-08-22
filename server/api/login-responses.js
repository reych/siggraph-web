const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jwt-simple');
const validateRequest = require('../middleware/validateRequest')

const Users = require('../model/users');

const router = express.Router();

// Return date object with time of expiration.
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

// Generate token.
function genToken(user) {
    let expires = expiresIn(3);
    let token = jwt.encode({
        expiresIn: expires,
        user: user
    }, require('../config/secret')());
    return {
        token: token,
        expires: expires
    }
}

// Authentication logic.
router.post('/login', (req, res) => {
    let username = req.body.username || '';
    let pass = req.body.password || '';

    if (username === '' || pass === '') {
        res.status(401).send({error: "Invalid credentials"});
        return;
    }

    Users.findOne({'username':username}).exec()
    .then((user) => {
        // Send back object with access token.
        if (user != null) {
            if(user.password === pass) {
                console.log("found user");
                if(user.role === 'admin') {
                    return res.status(200).send(genToken(user));
                }
                return res.status(401).send({error: "Unauthorized"});

            }
            // Failed.
            return res.status(401).send({error: "Invalid credentials"});
        } else {
            console.log("did not find user");
            return res.status(401).send({error: err.message});
        }


    })
    .catch((err) => {
        console.log("shit");
        res.status(400).send({error: err.message});
    })
})

router.post('/validate', (req, res) => {
    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (token) {
        try {
            let decoded = jwt.decode(token, require('../config/secret')());
            console.log(decoded.user.username);

            if (decoded.expiresIn <= Date.now()) {
                return res.status(400).send({"status":400, "message":"Token expired"});
            }

            let username = decoded.user.username;
            // Validate user in database.
            Users.findOne({'username':username}).exec()
            .then((user) => {
                if(decoded.user.password === user.password) {
                    if(decoded.user.role === 'admin') {
                        // Valid!
                        return res.status(200).send({success: "success"});

                    } else {
                        // Not an admin.
                        return res.status(403).send({error: "Not authorized"});
                    }

                } else {
                    // Bad password.
                    res.status(401).send({error: "Wrong key pass"});
                }
            })
            .catch((err) => {
                // Couldn't find user.
                res.status(401).send({error: err.message});
            })

        } catch (err) {
            // Something went horribly wrong.
            res.status(500).send({error: "Something went really wrong"});
        }
    } else {
        // Invalid token.
        res.status(401).send({error: "Invalid token"});
    }
})

module.exports = router;
