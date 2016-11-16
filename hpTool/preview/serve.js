
var express = require('express');
var path = require('path');
var request = require('request');
var fs = require('fs');
var app = express();

//var staticPath = path.resolve(__dirname, '/public');
//app.use(express.static(staticPath));

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
    var date = req.param('date');
    request("http://localhost:5000/json/"+date+".json").pipe(fs.createWriteStream("json/mappingOrder.json"));

    var order = request("http://localhost:5000/json/"+date+".json");

    if(req.session){
        console.log(req.session);
    }

    console.log('ok');
    console.log('date ',date);
    res.sendfile('preview.html');
});







// app.use('/', express.static(__dirname));
//
//
//
// app.get('/', function(req, res, next) {
//     var date = req.param('date');
//
//     //request("http://localhost:5000/json/"+date+".json").pipe(fs.createWriteStream("json/mappingOrder.json"));
//
//     console.log('date ',date);
//     res.send(date);
// });



// request("http://localhost:5000/json/2016-11-11.json", function(error, response, body) {
//     if (error) {
//         return console.error('upload failed:', error);
//     }
//
//     //console.log(body);
// });

// request("http://localhost:5000/json/2016-11-11.json").pipe(fs.createWriteStream("hello.json"));



var port = process.env.HTTP_PORT || 9000;
app.listen(port, function() {
  console.log('listening for DEV: on port %s', port);
});
