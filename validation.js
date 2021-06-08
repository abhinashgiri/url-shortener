const yup = require('yup')
const {nanoid} = require('nanoid')

const url_size = 6;



const schema = yup.object().shape({
  url : yup.string().trim().url(),
  slug: yup.string().trim().min(5),
})
async function input_validation(req,res,next)
{
  let {url,slug}=req.body;
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