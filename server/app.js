'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var bodyParser = require('body-parser');
var datetime = require('node-datetime');
var dt = datetime.create();
var geocoder = require('simple-geocoder');


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

//add mapdata 
var mapdata = require('./data/mapdata.js');

// Populate DB with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

//show the index page
app.use(express.static(__dirname + '/public'));

app.get('/form', function(req, res) {
    res.sendFile(__dirname + '/public/form.html');
});

// insert to database
// var mapstart = require('./start.json');

// for (var i = 0; i < mapstart.length; i++){
//   var newMap = new mapdata(mapstart[i]);
//   newMap.save(function(err) {
//     if (err) throw err;
//     console.log('saved default data');
//   });
// }

app.get('/api', function(req, res) {
    mongoose.model('mapdata').find(function(err, Descriptor, Created_Date, Latitude, Longitude) {
        res.send(Descriptor, Created_Date, Latitude, Longitude);
    });
});

app.get('/map', function(req, res) {
        res.sendFile(__dirname + '/public/map.html');
    })
    //get form data from index,form and push it on to the database
app.post('/form', function(req, res) {
    var formdescriptor = req.body.descriptor;
    var addresses = req.body.addresses;

    //add time & data (04/03/2016 00:37:53)
    var formtime = dt.format('m/d/Y H:M:S');

    geocoder.geocode(addresses, function(success, locations) {
        var formlat;
        var formlong;
        if (success) {
            formlat = locations.y;
            formlong = locations.x;
            console.log(locations);
        }
        var map2 = new mapdata({
            "Created Date": formtime,
            "Descriptor": formdescriptor,
            "Latitude": formlat,
            "Longitude": formlong
        });
        map2.save(function(err) {
            if (err) throw err;
            console.log(map2);
        });
        res.send('it worked');
    });

});


// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
