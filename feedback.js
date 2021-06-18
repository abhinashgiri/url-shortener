const mongoose = require('mongoose');


const string_uri = 'mongodb+srv://Abhinash:rcFEcOJKLfoH6Ctv@cluster0.7w8cs.mongodb.net/myFirstDatabase?retryWrites=true/feedback';
mongoose.createConnection(string_uri,{'useNewUrlParser':true, 'useUnifiedTopology':true})
.then(()=>console.log("Sucessfully Connected to MongoDB ..."))
.catch((error)=>console.log(`Database Error : ${error}`));


const feedbackSchema = {
  name : String,
  email: String,
  message:String,
  // changed from timestamp to Date instance
  createdOn:{type:Date,default: new Date()}
} 

const Feedback = mongoose.model('Feedback',feedbackSchema);


async function AddFeedback(name,email,message)
{

  let entry = new Feedback({
    name  : name,
    email : email,
    message:message
  })
  entry = await entry.save();
  console.log(`Feedback Added on database\n: ${entry}`);
}


module.exports={AddFeedback};

