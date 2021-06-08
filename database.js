const mongoose = require('mongoose');


const string_uri = 'mongodb+srv://Abhinash:rcFEcOJKLfoH6Ctv@cluster0.7w8cs.mongodb.net/myFirstDatabase?retryWrites=true/shortener';
mongoose.connect(string_uri,{'useNewUrlParser':true, 'useUnifiedTopology':true})
.then(()=>console.log("Sucessfully Connected to MongoDB ..."))
.catch((error)=>console.log(`Database Error : ${error}`));

const urlSchema = {
  url : String,
  slug: String,
  createdOn:{type:Date,default:Date.now}
} 

const urlShortener = mongoose.model('urlShortener',urlSchema);


async function createEntry(originalUrl,shortUrl)
{

  let entry = new urlShortener({
    url  : originalUrl,
    slug : shortUrl,
  })
  let slug_in_use = await urlShortener.find({slug:shortUrl});
  let slug_used = false;
  if(slug_in_use.length)
  {
    console.log(`Slug in use ${slug_in_use}`);
    slug_used=true;
    return slug_used=true;
  }
  entry = await entry.save();
  console.log(`Entry created on database\n Entry: ${entry}`);
  return slug_used;
}

async function removeEntry(slug)
{
  let result = await urlShortener.findOneAndDelete({slug:slug});
  console.log(`document to be removed is ${result}`);
}


async function getOriginalUrl (slug)
{
  const result = await urlShortener.find({slug:slug});
  console.log(`getOriginalurl , result : ${result}`);
  return result;
}

// createEntry('https://google.com','ae23zS').then(()=>{
//   getOriginalUrl("ae23zS").then((returned_value_of_promise)=>{
//     console.log( `returned_value_of_promise ${returned_value_of_promise}`);
//   // removeEntry('ae23zS');
//   })
// });

// console.log('Executed');


module.exports={createEntry,getOriginalUrl,removeEntry};
