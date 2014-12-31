
var express = require('express');
var path=require('path');

//var favicon=require('serve-favicon');
//var logger=require('morgan');
//var cooki=require('cookie-parser');
//var bodyparser=require('body-parser');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));
//app.use(logger('dev'));
//app.use(bodyparser.json());
/***
app.use(bodyparser.urlencoded());
app.use(cooki());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/public'));
***/
// app.use(bodyparser());
//app.use(methodover());
 //app.use(express.router());
/***
app.get('/', function(req, res) {
  
  res.send("Hello world and Globi_2.0.0.!!!");
});
***/
/***
//var router = express.Router();

***/
 //var db=require('mongoskin').db("mongodb://localhost:27017/todo");
 var db=require('mongoskin').db(process.env.MONGOHQ_URL,{w:1});

/***
var db=require('mongoskin').db("mongodb://alik:123456@dogen.mongohq.com:10004/alikon-fantastic-database");
***/
app.get('/', function(req, res) {
var drinks=[
{name:'Bloody Mary',drunk:3},
{name:'Alik',drunk:5},
{name:'Dima',drunk:10}
];
db.collection('tasks').find().toArray(function(err,result){
if(err)throw err;

  res.render('index', { drinks:drinks, title: 'Express',resul:result});
});});


app.get('/paramorig',function(req,res){

db.collection('tasks').find().toArray(function(err,result){
if(err)throw err;
/***
task=name,_id,done=completed

***/

var data={};
var task=result.map(function(tw){return tw.task;});
var completed=result.map(function(tw){return tw.done;});
var _id=result.map(function(tw){return tw._id;});
data.task=task;
data.completed=completed
data._id=_id;
//var cb=JSON.stringify(data);
//console.log(cb);
//console.log(result);

res.send(JSON.stringify(data));
});
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});