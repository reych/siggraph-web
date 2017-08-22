const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jwt-simple');

const Users = require('../model/users');

module.exports = (req, res, next) => {
    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers.authorization;
    console.log(req.headers.authorization);

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
                        //return res.status(200).send({success: "success"});
                        // Next middleware.
                        next();
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
}
