const date = require('date-and-time');
const schedule = require('node-schedule');




let now =  new Date();
console.log(now);
// date.addMinutes(10);
console.log(date.format(now, 'YYYY/MM/DD HH:mm:ss:SSS'));
// now = date.addMinutes(now,2);
now = date.addMinutes(now,1);

console.log(date.format(now, 'YYYY/MM/DD HH:mm:ss:SSS'));
function runJob(jobName,time)
{
    schedule.scheduleJob(jobName,time,()=>{
    console.log(`Job named Test ran at ${time}`);
  })
}

runJob('Test',now);
console.log('executed',date.format(now, 'YYYY/MM/DD HH:mm:ss:SSS'));




