var mongoose = require('mongoose');

var QuoteSchema = mongoose.Schema({
  text: String,
  author: String
});

module.exports = mongoose.model('Quote', QuoteSchema);