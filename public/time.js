const homePage = "https://shortify-9s08.onrender.com/";
console.log(`homePage: ${homePage} `);
function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var midday = "AM";
  midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
  hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("clock").innerText = hour + " : " + min + " : " + sec + " " + midday; /* adding time to the div */
  var t = setTimeout(currentTime, 1000); /* setting timer */
}
function updateTime(k) { /* appending 0 before time elements if less than 10 */
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

async function slug_in_use()
{
  Swal.fire({
    title: 'Alias is not available !',
    text:'Please choose a different one.',
    icon: 'info',
    confirmButtonText:'Okay'
  }).then((result)=>{
    if(result.isConfirmed)
    {
      window.location.replace(homePage);
    }
  })
}

async function feedback()
{
  Swal.fire({
    title: 'Thank You !',
    text:'We value your feedback.',
    icon: 'success',
    confirmButtonText:'Okay'
  }).then((result)=>{
    if(result.isConfirmed)
    {
      window.location.replace(homePage);
    }
  })
}

async function slug_expired()
{
  Swal.fire({
    title: 'Alias Doesn\'t exist !',
    text:'Probably expired, please create one.',
    icon: 'error',
    confirmButtonText:'Okay'
  }).then((result)=>{
    if(result.isConfirmed)
    {
      window.location.replace(homePage);
    }
  })
}


async function blocked_hostname()
{
  Swal.fire({
    title: 'URL domain banned !',
    text:'Try another URL.',
    icon: 'error',
    confirmButtonText:'Okay'
  }).then((result)=>{
    if(result.isConfirmed)
    {
      window.location.replace(homePage);
    }
  })
}


async function Error_Handler(message)
{
  // console.log('Activated');
  Swal.fire({
    title: 'Error !',
    text:message,
    icon: 'error',
    confirmButtonText:'Okay'
  }).then((result)=>{
    if(result.isConfirmed)
    {
      window.location.replace(homePage);
    }
  })
}



// fire callback on loading   the page
window.onload = ()=>{
  
  currentTime();
  var x = document.getElementById('show-popup');
  if(x)slug_in_use();
  x = document.getElementById('expired');


  if(x)slug_expired();
  x = document.getElementById('feedback');


  if(x)feedback();
  
  // 404 page home button 
  x = document.getElementById('home-button');
  if(x)x.onclick = ()=>{
    location.href = homePage;
  }

  // URL domain banned
  x=document.getElementById('urlshortify');
  if(x)blocked_hostname();

  // error handler
  x=document.getElementById('error');
  if(x)
  {
    Error_Handler(x.classList.value);
  }
}
