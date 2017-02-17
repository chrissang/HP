
var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();

//var staticPath = path.resolve(__dirname, '/public');
//app.use(express.static(staticPath));

app.use(express.static(__dirname + '/'));


app.get('/:simulator', function(req, res){
    var date = req.query.date;

    if (date) {
        request("http://localhost:5000/hp_config/"+date+".js").pipe(fs.createWriteStream("js/mappingOrder.js") );
        console.log('ok');
        console.log(date);
    }

    res.sendFile(__dirname + '/');
});


var port = process.env.HTTP_PORT || 9000;
app.listen(port, function() {
  console.log('listening for DEV: on port %s', port);
});
