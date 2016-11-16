
var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();

//var staticPath = path.resolve(__dirname, '/public');
//app.use(express.static(staticPath));

app.use(express.static(__dirname + '/'));



//res.header("Access-Control-Allow-Origin", "*");
app.get('/:simulator', function(req, res){
    var date = req.query.date;
    request("http://localhost:5000/json/"+date+".json").pipe(fs.createWriteStream("json/mappingOrder.json"));



    // if(req.session){
    //     console.log(req.session);
    // }

    console.log('ok');
    console.log(req.query.date);
    //console.log(res.params.preview);
    //console.log(req.query);
    //console.log('date ',req.query.date);
    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ a: 1 }));
    res.sendFile(__dirname + '/');
});


var port = process.env.HTTP_PORT || 9000;
app.listen(port, function() {
  console.log('listening for DEV: on port %s', port);
});
