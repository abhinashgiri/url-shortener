
var btn = document.getElementById('btn');
var clipboard = new ClipboardJS(btn);



console.log(btn);
clipboard.on('success', function (e) {

  console.log(`e  is ${e.body}`,'success');
});

clipboard.on('error', function (e) {
  console.log(e);
});