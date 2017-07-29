const express = require('express');
const multer = require('multer');

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage }).single('photo');

router.post('/', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log("Error uploading image...");
            res.status(400).send({err: err.message});
        } else {
            console.log("Success uploading image...");
            console.log(req.file.filename);

        }
    })
})

router.get('/get', (req, res) => {
    var options = {
        root: __dirname + '/server/uploads/'
    }

    res.sendFile(req.body.name, options, (err) => {
        if(err) {
            console.log("Error getting image...");
        } else {
            console.log("Success getting image...");
        }
    })
})

module.exports = router;
