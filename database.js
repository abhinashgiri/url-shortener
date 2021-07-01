const mongoose = require('mongoose');

const key  = process.env.MONGO_SECRET ; // secret key to connect to database
const user  = process.env.MONGO_USER;   // db user
const connectionString = 'mongodb+srv://'+user+':'+key+'@cluster0.7w8cs.mongodb.net/Shortify?retryWrites=true&w=majority'

mongoose.connect(connectionString,{'useNewUrlParser':true, 'useUnifiedTopology':true})
.then(()=>console.log("Sucessfully Connected to MongoDB ..."))
.catch((error)=>console.log(`Database Error : ${error}`));


// require models
const {urlShortener} = require('./models/url_shortened');
const {Feedback}  = require('./models/feedback')



async function createEntry(originalUrl,shortUrl)
{

  let entry = new urlShortener({
    url  : originalUrl,
    slug : shortUrl,
  })
  let slug_in_use = await urlShortener.find({slug:shortUrl});
  let SLUG_USED = false;
  let CREATED_ON = entry.createdOn;
  if(slug_in_use.length)
  {
    console.log(`Slug in use ${slug_in_use}`);
    SLUG_USED=true;
    return {slug_used:SLUG_USED,createdOn:CREATED_ON};
  }
  entry = await entry.save();
  console.log(`Entry created on database\n Entry: ${entry}`);
  return {slug_used:SLUG_USED,createdOn:CREATED_ON};
}

async function removeEntry(slug)
{
  let result = await urlShortener.findOneAndDelete({slug:slug});
  console.log(`document to be removed is ${result}`);
  return result;
}


async function getOriginalUrl (slug)
{
  const result = await urlShortener.find({slug:slug});
  console.log(`getOriginalurl , result : ${result}`);
  return result;
}


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


module.exports={createEntry,getOriginalUrl,removeEntry,AddFeedback};

