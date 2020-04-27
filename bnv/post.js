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
    message_new += blindmap[(message[i].charCodeAt(0))];
  }

  console.log("Searching " + message + " with " + message_new);
  datasend = JSON.stringify({
    'message': message_new,
  });
  var url = 'https://bnv.web.ctfcompetition.com/api/search';
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');

  xhr.onreadystatechange =
      function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.getResponseHeader('Content-Type'));
        if (xhr.getResponseHeader('Content-Type') == "application/json; charset=utf-8") {
            try {
                var json = JSON.parse(xhr.responseText);
                console.log(json);
            }
            catch(e) {;
                console.log(message);
            }
        }
        else {
            console(xhr.responseText);
        }
    }
}
      xhr.send(datasend);
}

AjaxFormPost("paris");
