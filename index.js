/***
var http=require('http');
http.createServer(function(req,res){
res.writeHead(200,{'Content-Type':'text/plain'});
res.end("Hello Globibot!");}).listen(5000);
//console.log('Server running at http://127.0.0.1:1337/');
***/
var express = require('express');
var app = express();
var cool=require('cool-ascii-faces');
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  //response.send('Hello World!');
  response.send(cool()+"  Hello world and Globi_2.0.0.!!!");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});