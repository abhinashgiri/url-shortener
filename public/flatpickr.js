function get_Time()
{
  let g = new Date();
  g.setMinutes(g.getMinutes()+5);
  let p = g.getHours() + ":"+ g.getMinutes();
  p.toString();
  // console.log(`g is ${g} , ${p}`);
  return p;
}

const x = document.getElementById('Expiry_date');
// console.log(x);

const config = {
  enableTime: true,
  altInput: true,
  altFormat: "F j, Y \\  \\  h:i K",
  dateFormat: "Y-m-d h:i K",
  minDate : flatpickr.formatDate(new Date(), "Y-m-d h:i K"),
  minTime : get_Time(),
  minuteIncrement : 1,
  // defaultDate : flatpickr.formatDate(new Date(), "Y-m-d h:i K"),
  disableMobile: "true",
  time_24hr : "false"
}


let fp = flatpickr(x, config);
fp.setDate((new Date).setMinutes((new Date).getMinutes()+5));

let hide="block";



// handling Never Expire option
document.getElementById('noExpiry').onchange = function() {
  
  let expiryDate =  document.getElementById('Expiry_date')
  expiryDate.disabled = this.checked;
  
  if(this.checked)
  {
    hide="none";
    fp.destroy();
  }
  else 
  {
    hide="block";
    fp = flatpickr(x, config);
  }
  let expiryLabel = document.getElementById('expiry-label');
  let aliasSub = document.getElementById('alias-subHeading');
  expiryDate.style.display=hide;
  expiryLabel.style.display=hide;
  aliasSub.style.display=hide;
};

setInterval(() => {
  // console.log('Updating every min ..');
  if(hide=="block")
  {
    fp.setDate((new Date).setMinutes((new Date).getMinutes()+5)  );
    fp.set('minTime',get_Time());
  }
}, 60000);