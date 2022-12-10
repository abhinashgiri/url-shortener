require('dotenv').config();
const debug = require('debug')('app:debug');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const date = require('date-and-time');
const schedule = require('node-schedule');
const {URL} = require('url'); // for geting hostname of url so that we can ban self domain
const input_validation = require('./validation');
const {
  createEntry,
  getOriginalUrl,
  removeEntry,
  AddFeedback
} = require('./database');




// "build": "tailwindcss build ./public/src/tailwind-styles.css -o ./public/style.css"
const homePage = process.env.HOMEPAGE;
// const homePage = "http://localhost:5000/";
const port = process.env.PORT || 5000;
console.log(homePage);
const app = express();

app.use(express.json());

// is used to populate req.body property with user data to look like json object
// key=value & key=value { these type of data , usually in html forms }
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());
app.use(helmet());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', 'public/views');








app.get('/', (req, res) => {
  res.render('index', {
    title: 'null',
    message:'null'
  });
})


// redirect to original url when given a shorten url by querying the database for original url
app.get('/:id', (req, res, next) => {
  debug(`entered ${req.params.id}`);
  const slug = req.params.id;
  debug(`slug :${slug}`);
  // getOriginalUrl returns an array of results (although a single element in an arrar , in our case)
  getOriginalUrl(slug)
    .then((result) => {
      // probably the entry expired or did not exist
      if (result.length == 0) {
        req.body.title = 'expired';
        res.render('index', {
          title: 'expired'
        })
        return;
      }
      debug(`originalUrl : ${result[0].url}`);
      res.redirect(result[0].url);
    })
    .catch((error) => {
      next(error);
    })
})




// generate shorten url for requested url and enter in database
app.post('/service', async (req, res, next) => {
  try {
    // await input_validation(req,res,next);
    // res.send(req.body);

    //  ban same domain
    debug(req.body);
    const urlObject = new URL(req.body.url);
    if (urlObject.hostname == homePage) {
      res.render('index', {
        title: 'urlshortify',
        message:'null'
      });
      return;
    }

    await input_validation(req, res, next).then(() => {
      createEntry(req.body.url, req.body.slug)
        .then((obj) => {
          debug(`obj : ${obj.createdOn}`);
          const slug_in_use = obj.slug_used;
          const createdOn = obj.createdOn;
          if (slug_in_use == true) {
            res.render('index', {
              title: 'slug_in_use',
              message:'null'
            });
            return;
          }
          debug(`slug_in_use : ${slug_in_use}`);

          if (req.body.neverExpire != 'on') {
            debug('checkbox is not selected');
            // schedule auto deletion at expiry time
            let expiry = req.body.expiry;
            expiry = new Date(expiry);
            expiry = expiry.toUTCString();
            expiry = new Date(expiry);
            debug(`created on ${createdOn}, expires at ${date.format(expiry, 'YYYY/MM/DD HH:mm:ss')}`);
            schedule.scheduleJob(expiry, async () => {
              await removeEntry(req.body.slug).then((result) => {
                debug(`Deleted entry ${result}`);
              })
            })
          }


          const link = homePage + req.body.slug;
          debug(link);
          res.render('success', {
            ORIGINAL_URL: req.body.url,
            SHORT_URL: link
          });
        })

    });

  } catch (error) {
    debug('Invalid');
    next(error);
  }
})

// feedback route 
app.post('/feedback', (req, res) => {
  AddFeedback(req.body.name, req.body.email, req.body.message);
  res.render('index', {
    title: 'feedback',
    message:'null'
  });
})








// error handler
app.use((error, req, res, next) => {
  debug(`Error handler activated\n Error:${error.message}`);
  if(error.message=="url must be a valid URL")error.message="Input must be a valid URL";
  res.render('index', {
    title: 'error',
    message:`${error.message}`
  });
  // res.send(error.message);


})

// 404 route
app.use(function (req, res, next) {
  debug('404 Error Handled Sucessfully !');
  res.status(200).sendFile(path.join(__dirname + '/public/Not_Found.html'));
})




app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
})