const express = require('espress');
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

var upload = multer({ storage: storage }).single('profileImage');

router.post('/', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log("Error uploading image...")
            res.status(400).send({err: err.message});
        } else {
            console.log("Success uploading image...")

        }
    })
})
