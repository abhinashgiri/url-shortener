// setting default expiry value to 10 min 

function get_Date_Time()
{
  var x = document.getElementById("Expiry_date");
  if(!x)return;
  // convert to local date string dd/mm/yyyy, hh:mm:ss
  let d =  new Date();
  // 5 min later to current time
  d.setMinutes(d.getMinutes()+5);
  d=d.toLocaleString();
  console.log(d);
  let p = d.split(',');
  // remove spaces
  p[0]=p[0].trim();
  p[1]=p[1].trim();

  // convert dd/mm/yyyy to yyyy-mm-dd
  let i = p[0].split('/');
  let date = i[2]+'-'+i[1]+'-'+i[0];
  p[1].trim()
  let time = p[1].split(':');
  d = date+'T'+time[0]+':'+time[1];
  x.value = d;
  x.min = d;
}


async function slug_in_use()
{
  Swal.fire({
    title: 'Alias in use !',
    text:'Please , Choose a different one.',
    icon: 'info',
  })
}
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



// fire callback on loading everything  the page
window.onload = ()=>{
  get_Date_Time();
  currentTime();
  // slug_in_use();
  
}

// let timerInterval
// Swal.fire({
//   title: 'Loading!',
//   html: 'I will close in <b></b> milliseconds.',
//   timer: 2000,
//   timerProgressBar: true,
//   didOpen: () => {
//     Swal.showLoading()
//     timerInterval = setInterval(() => {
//       const content = Swal.getHtmlContainer()
//       if (content) {
//         const b = content.querySelector('b')
//         if (b) {
//           b.textContent = Swal.getTimerLeft()
//         }
//       }
//     }, 100)
//   },
//   willClose: () => {
//     clearInterval(timerInterval)
//   }
// }).then((result) => {
//   /* Read more about handling dismissals below */
//   if (result.dismiss === Swal.DismissReason.timer) {
//     console.log('I was closed by the timer')
//   }
// })
