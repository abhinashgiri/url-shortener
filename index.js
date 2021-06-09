const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const date = require('date-and-time');
const schedule = require('node-schedule');

const input_validation = require('./validation');
const {createEntry,getOriginalUrl,removeEntry} = require('./database');


const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static('./public'));






// redirect to original url when given a shorten url by querying the database for original url
app.post('/original',(req,res,next)=>{
  const slug  = req.body.slug;
  // getOriginalUrl returns an array of results (although a single element in an arrar , in our case)
  getOriginalUrl(slug)
  .then((result)=>{
    // probably the entry expired or did not exist
    if(result.length==0)
    {
      res.send('No Entry found with requested slug, probably expired\n Try creating new Entry !');
      return;
    }
    console.log(`originalUrl : ${result[0].url}`);
    res.redirect(result[0].url);
  })
  .catch((error)=>{
    next(error);
  })
})


// generate shorten url for requested url and enter in database
app.post('/service', async  (req,res,next)=>
{
  try 
  {
    // await input_validation(req,res,next);
    // res.send(req.body);
    await input_validation(req,res,next).then(()=>{
      createEntry(req.body.url,req.body.slug)
      .then((obj)=>{
        const slug_in_use=obj.slug_used;
        const createdOn = obj.createdOn;
        if(slug_in_use==true)
        {
          res.send('Slug already in use\n');
          return;
        }
        console.log(`slug_in_use : ${slug_in_use}`);
        let expiry = new Date ();
        expiry = createdOn;
        expiry = date.addMinutes(expiry,req.body.expiry);
        console.log(`created on ${createdOn}, expires at ${date.format(expiry, 'YYYY/MM/DD HH:mm:ss')}`);
        schedule.scheduleJob(expiry,async ()=>{
            await removeEntry(req.body.slug).then((result)=>{
            console.log(`Deleted entry ${result}`);
          })
        })
        res.send(req.body);
      })
      
    });
    
  } 
  catch (error) 
  {
    next(error);
  }
})

// error handler
app.use((error , req,res,next)=>
{
  console.log(`Error handler activated\n Error:${error.message}`);
  res.send(error.message);
  
})



const port = process.env.PORT ||5000;
app.listen(port,()=>{
  console.log(`Listening on http://localhost:${port}`);
})



