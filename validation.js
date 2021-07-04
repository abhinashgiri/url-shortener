const yup_validation = require('debug')('app:yup_validation');
const yup = require('yup')
const {nanoid} = require('nanoid')

const url_size = process.env.URL_SIZE;
yup_validation(url_size);

const schema = yup.object().shape({
  url : yup.string().trim().url().required('Must Enter an URL'),
  slug: yup.string().trim(),
})
async function input_validation(req,res,next)
{

  let {url,slug}=req.body;
  url = url.trim();
 
  // regex expression to replace each continuous whitespace substring with empty string 
  slug = slug.replace(/\s+/g, '');
  await schema.validate({
      url:url,
      slug:slug}
  )
  .then(async ()=>{
    yup_validation('validated');
    if(slug==='...')slug='';   
    if(!slug)slug =  nanoid(url_size);
    // removed await from here
    req.body.url =   url;
    req.body.slug =  slug;
    yup_validation(req.body);
    return;
  })
  .catch((err)=>{
    yup_validation(err);
    next(err);
    return;
  }) 
}

module.exports = input_validation;