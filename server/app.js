/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var bodyParser = require('body-parser');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

//show the index page
app.use(express.static(__dirname + '/public'));

app.get('/map', function (req, res) {
  res.sendFile(__dirname + '/public/map.html');
});

app.get('/form', function (req, res) {
  res.sendFile(__dirname + '/public/form.html');
});

//get form data from index,form and push it on to the database
app.post('/form.html', function (req, res) {
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  res.send(firstName + ' ' +lastName);
});


//show db information is csv.



// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
