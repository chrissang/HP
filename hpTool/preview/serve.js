

var path = require('path');
var express = require('express');
var fs = require('fs');
var http = require("http");
var request = require('request');
var router = express.Router();
var bodyParser  = require('body-parser');

var app = express();

//var staticPath = path.resolve(__dirname, '/public');
//app.use(express.static(staticPath));


var port = process.env.HTTP_PORT || 9000;

// request("http://localhost:5000/json/2016-11-11.json", function(error, response, body) {
//     if (error) {
//         return console.error('upload failed:', error);
//     }
//
//     //console.log(body);
// });

request("http://localhost:5000/json/2016-11-11.json").pipe(fs.createWriteStream("hello.json"));


// app.get('/', function(req, res, next) {
//     var date = req.param('date');
//     console.log('date ',date);
//     res.send(date);
//
// });



app.use('/', express.static(__dirname));
app.listen(port, function() {
  console.log('listening for DEV: on port %s', port);
});
