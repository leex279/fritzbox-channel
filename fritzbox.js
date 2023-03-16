const fritz = require('fritzbox.js')
const options = {
  username: 'xxxxxxxxx',
  password: 'xxxxxxxx',
  server: '192.168.178.1',
  protocol: 'http' }

let sessionId = ""
let body = ""

async function login () {
  sessionId = await fritz.getSessionId(options)
  body = 'xhr=1&sid='+sessionId+'&lang=de&page=docInfo&xhrId=all'
  if (sessionId.error) {
    console.log('Error:', sessionId.error.message)
    process.exit(1)
  } else {
//    console.log(sessionId)
   fetch("http://192.168.178.1/data.lua", {
  "headers": {
    "accept": "*/*",
    "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "pragma": "no-cache",
    "Referer": "http://192.168.178.1/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body" : body,
  "method": "POST"
}).then(function(serverPromise){ 
      serverPromise.json()
        .then(function(j) {
          var now = new Date();
          console.log(now); 
          docsis30 = j.data.channelUs.docsis30;
          docsis30.forEach((el) => {
                console.log(el.type);
          
          });
          console.log("\n");  
          
        })
        .catch(function(e){
          console.log(e);
        });
    })
    .catch(function(e){
        console.log(e);
      });
  }
}
login()
