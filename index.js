var flash = require('connect-flash')
var express = require('express');
var path=require('path');
//var passport=require('passport');
var cookieParser=require('cookie-parser');
//var bodyparser=require('body-parser');
//var met=require('method-override');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
 
  response.send("  Hello world and Globi!!!");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});