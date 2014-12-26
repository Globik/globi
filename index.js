
var express = require('express');
var path=require('path');

var favicon=require('serve-favicon');
var logger=require('morgan');
var cooki=require('cookie-parser');
var bodyparser=require('body-parser');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(cooki());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/public'));
//app.use(bodyparser());
//app.use(methodover());
 //app.use(express.router());
/***
app.get('/', function(req, res) {
  
  res.send("Hello world and Globi_2.0.0.!!!");
});
***/
/***
var router = express.Router();

***/
var db=require('mongoskin').db("mongodb://alik:123456@dogen.mongohq.com:10004/alikon-fantastic-database");
app.get('/', function(req, res) {
var drinks=[
{name:'Bloody Mary',drunk:3},
{name:'Alik',drunk:5},
{name:'Dima',drunk:10}
];
  res.render('index', { drinks:drinks, title: 'Express' });
});
/***
db.collection('tasks').find().toArray(function(err,result){
if(err)throw err;
var data={};

 var cnn=result.map(function(tw){return tw.task;});
data.name=cnn;
var cb=JSON.stringify(data);
console.log(cb);
console.log(result);});
***/

app.get('/paramorig',function(req,res){
db.collection('tasks').find().toArray(function(err,result){
if(err)throw err;


var data={};
var task=result.map(function(tw){return tw.task;});
data.task=task;
var cb=JSON.stringify(data);
console.log(cb);
console.log(result);
res.send(cb);
});
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});