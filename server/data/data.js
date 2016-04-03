var mongoose = require('mongoose');

var complaintSchema = mongoose.Schema({
	unique_key : Number,
	descriptor: String,
	city: String
});

module.exports = mongoose.model('Complaint', complaintSchema);