const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const feedbackSchema = new Schema({
  name : String,
  email: String,
  message:String,
  // changed from timestamp to Date instance
  createdOn:{type:Date,default: new Date()}
})

//            return a class   <-- mongoose.model('Collection_name',schema)
const Feedback = mongoose.model('Feedback',feedbackSchema);

module.exports = {Feedback};