var mongoose = require('mongoose');


var mapdataschema = mongoose.Schema({
  Status: String, 
  Descriptor: String, 
  Latitude: Number, 
  Longitude: Number
});

var mapdata = mongoose.model('mapdata', mapdataschema);


module.exports = mapdata;

