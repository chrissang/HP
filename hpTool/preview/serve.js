

var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser  = require('body-parser');

var app = express();

//var staticPath = path.resolve(__dirname, '/public');
//app.use(express.static(staticPath));
app.use('/', express.static(__dirname));

var port = process.env.HTTP_PORT || 9000;

request("http://localhost:5000/json/2016-11-11.json", function(error, response, body) {
  console.log(body);

});

app.listen(port, function() {
  console.log('listening for DEV: on port %s', port);
});
