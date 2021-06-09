const yup = require('yup')
const {nanoid} = require('nanoid')

const url_size = 6;



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
  console.log(`Slug: ${slug}`);
  await schema.validate({
      url:url,
      slug:slug}
  )
  .then(async ()=>{
    console.log('validated');   
    if(!slug)slug =  nanoid(url_size);
    // removed await from here
    req.body.url =   url;
    req.body.slug =  slug;
    console.log(req.body);
    return;
  })
  .catch((err)=>{
    next(err);
    return;
  }) 
}

module.exports = input_validation;