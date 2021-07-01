const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url : String,
  slug: String,
  // changed from timestamp to Date instance
  createdOn:{type:Date,default: new Date()}
})

const urlShortener = mongoose.model('urlShortener',urlSchema);

module.exports = {urlShortener};