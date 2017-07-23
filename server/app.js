

const express = require('express');
const path    = require("path");
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || '3000';

// connecting with MongoDB
//mongoose.connect(config.mongodb.host);
mongoose.connect('mongodb://localhost:27017/sampledb'); // TODO make a config file later or something. Make another db for admin?

// view engine setup
//app.set('views', path.join(__dirname, '..', 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, '..', 'public', 'images', 'ctclogo.png')));

//app.use(logger('dev'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static path to dist.
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Path to save files.
//app.use(bodyParser({uploadDir:'/uploads'}));

// API routes.
app.use('/api/events', require('./api/events-responses'));
app.use('/api/about', require('./api/about-responses'));

// Catch other routes.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(err.status || 401);
            res.send({
                error: err.message
            });
        } else {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(err.status || 401);
        res.send({
            error: "Unauthorized Access"
        });
    } else {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// });
