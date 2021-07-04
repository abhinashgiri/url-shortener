var btn = document.getElementById('btn');
var clipboard = new ClipboardJS(btn);


clipboard.on('success', function (e) {
  icon.src="./images/tick.svg"
  // console.log(`e  is ${e.body}`,'success');
  setTimeout(()=>{
    icon.src="./images/clippy.svg"
  },1000)
});

clipboard.on('error', function (e) {
  console.log(e);
});

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

window.onload = ()=>{
  currentTime();
  if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }

}