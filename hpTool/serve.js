

var path = require('path');
var express = require('express');
var fs = require('fs');
var bodyParser  = require('body-parser');

var app = express();

//var staticPath = path.resolve(__dirname, '/public');
//app.use(express.static(staticPath));
app.use('/', express.static(__dirname));

var port = process.env.HTTP_PORT || 5000;
var mydata = {}

app.use(bodyParser.urlencoded({extended : true}));// to support URL-encoded bodies

app.post("/json", function(request, response) {
    response.send(request.body);
    var outputFilename = __dirname+'/hp_config/'+request.body.date+'.js';

    var data = JSON.stringify(request.body.json, null, 4);

    var content = 'var mappingOrder = '+ data;
    fs.writeFile(outputFilename, content, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    });
});


app.listen(port, function() {
  console.log('listening for DEV: on port %s', port);
});
