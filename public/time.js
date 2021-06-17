// setting default expiry value to 10 min 

function get_Date_Time()
{
  var x = document.getElementById("Expiry_date");
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


// fire callback on loading everything  the page
window.onload = ()=>{
  get_Date_Time();
}

