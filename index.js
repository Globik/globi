var flash = require('connect-flash')
var express = require('express');
var path=require('path');
var passport=require('passport');
//var cookieParser=require('cookie-parser');
var bodyparser=require('body-parser');
var session=require('express-session');

var LocalStrategy = require('passport-local').Strategy;
var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    
    process.nextTick(function () {
      
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { 
return done(null, false, { message: 'Unknown user ' + username }); 


}
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));
//app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(session({secret:'some string',resave:false,saveUninitialized:true}));
app.use(flash());
 app.use(passport.initialize());
  app.use(passport.session());


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

  res.render('index', { drinks:drinks, title: 'Express',user:req.user,resul:result});
});});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



app.get('/paramorig',function(req,res){

db.collection('tasks').find().toArray(function(err,result){
if(err)throw err;
/***
task=name,_id,done=completed

***/

var data={};
var task=result.map(function(tw){return tw.task;});
var completed=result.map(function(tw){return tw.completed;});
var _id=result.map(function(tw){return tw._id;});
data.task=task;
data.completed=completed
data._id=_id;
//var cb=JSON.stringify(data);
//console.log(cb);
//console.log(result);
//console.log('req.param '+req.param);
res.send(JSON.stringify(data));
});
});
app.post('/angaben',function(req,res){
console.log(req.body.name);//yes!!=>val pit
console.log(req.body);
db.collection('tasks').save({task:req.body.name,completed:false},
function(err,task){
if(err) throw err;
console.log('added: '+req.body.name);});
//console.log(JSON.parse(req.body.name));
res.send(req.body);
});

app.post('/delete',function(req,res){
db.collection('tasks').removeById(req.body.del,function(err,count){
if(err)throw err;
console.log("deleted :"+req.body.del);

res.send("OK");
});
});

app.post('/edit',function(req,res){

db.collection('tasks').findById(req.body.editi,function(err,result){
if(err)throw err;
console.log("get :"+req.body.editi);
console.log("result is found :"+result.task);

res.send(result.task);
});

//console.log(req.body.editi);
//res.send(req.body.editi);
});

app.post('/savedit',function(req,res){
db.collection('tasks').updateById(req.body._id,{$set:{task:req.body.name}},function(err,result){
if(err)throw err;
console.log('You trying update req.body.name: '+req.body.name);
console.log('req.body._id: '+req.body._id);
res.send(req.body.name);
});

//console.log('req.body.name: '+req.body.name);
//console.log('req.body._id: '+req.body._id);
//res.send(req.body.name);
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
/***
cd mon/bin
mongod -dbpath c:/users/user/mon/data/db
***/