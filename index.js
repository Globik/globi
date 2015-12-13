'use strict';
//node index
var suka='';
var develop="development";
var http=require('http');
var express=require('express');
var path=require('path');
var logger=require('morgan');
var flash=require('connect-flash');
var favicon = require('serve-favicon');
var passport=require('passport');
var cookieParser=require('cookie-parser');
var methodOverride=require('method-override');
var session=require('express-session');
//var MongoStore=require('connect-mongo')(session);
var bodyParser=require('body-parser');
var multer=require('multer');
var errorHandler=require('errorhandler');
var fs=require('fs');
//var reload=require('reloadjs');
var db={};
//var url="mongodb://127.0.0.1:27017/todo";
var url=process.env.MONGOHQ_URL
//var url=process.env.MONGOHQ_URL_TEST;

var MongoClient=require('mongodb').MongoClient;
var ObjectID=require('mongodb').ObjectID;
MongoClient.connect(url,(er,dob)=>{
	if(er){console.log('DB Error :',er);
	suka+=er;}
	else{console.log('db connected');db.b=dob;suka+=db.b +' : db '+ db;}
require('./config/passport')(db.b,passport);
});

//var crypto=require('crypto');

var app=express();
app.set('port',process.env.PORT || 3000);
app.set('env',develop);
//app.set('views',path.join(__dirname,'views'));
//app.set('view engine','jade'); 
app.use(favicon(__dirname+'/public/w4.png'));

//var user={_id:1,username:"Bob",password:"secret"};

//if(develop==app.get('env')){app.use(logger('dev'));}
app.use(methodOverride());
//app.use(cookieParser('secret','mysecret'));
app.use(session({/*cookie:{httpOnly:true,secure:false,maxAge:60*60*4000},*/
resave:false,saveUninitialized:true,secret:'bred'/*,store:new MongoStore({url})*/}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer({dest:'./uploads'}).single('singleInputFileName'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
	/*
var redstr=fs.createReadStream('./advert-config.json');
redstr.on('error',(er)=>{console.log('err readstr :',er);suka+=er;});
redstr.on('data',(d)=>{
req.advdata=JSON.parse(d.toString());
*/
req.db=db.b;
suka+=req.db;
next();
});


var limit=10;

function pagination(req,res,next){
	var qu=parseInt(req.params.page) || 1;
	var page=qu;
	var num=page*limit;
	//var total_articles=150;
	var w=5,ab=[],deg=2;var map=new Map();
	db.b.collection('posts').count((er,total_articles)=>{
		if(er){console.log("ERR IN DB COUNT :",er);next(er);}
	var total_pages=Math.ceil(total_articles/limit);
 for(var i=1;i<=total_pages;i++){ab.push(i);}
ab.forEach(y=>{
if(total_pages >=15){
if(y<=w){map.set(y,ab.slice(0,w));}
if(y>w && y <(total_pages-w)){map.set(y,ab.slice((y-1)-deg,y+deg));;}
if(y>=total_pages-w){map.set(y,ab.slice(total_pages-w,total_pages));}
}else{
map.set(y,ab.slice(0,total_pages))
}
});
res.locals.total_articles=total_articles;
	res.locals.total_pages=total_pages;
	res.locals.page=page;
	res.locals.rang_page=map;
if(num<total_articles) {res.locals.next=true;}
if(num>limit) {res.locals.prev=true;}
next();
	});
}

//node --harmony --harmony_destructuring --harmony_rest_parameters --harmony_modules index
//node --harmony index
/*
var {nick}=require('./simplemodul');//h_destructuring
console.log(nick({bit:"34"})) */

//function asa(...b){console.log(...b)}  
//var viewsDir=path.join(__dirname,'views');
var flipbit=0;
/*
fs.watch(viewsDir,{persistent:true},(event,pat)=>{
if(event=='change'){if(!flipbit){console.log("DOING this Path :",pat);}else{
var temp=path.join(viewsDir,pat);reload(temp);}flipdas();}});
*/
var router=express.Router();
var haupt_page=require('./views/haupt_page.js');
var login=require('./views/login.js');
//supervisor --harmony --harmony_destructuring -w views index 
//supervisor --harmony --harmony_destructuring views index
//supervisor --force-watch views index

router.get('/',(req,res)=>{
	//var adv=req.advdata;
	var bib=haupt_page.haupt_page({showmodule:true,message:suka,buser:req.user});
	res.send(bib);});

router.get('/login',(req,res)=>{
	var message=req.flash('message');
	res.send(login.login({message}));
});

var articles_page=require('./views/articles_page');

router.get('/articles',pagination,(req,res)=>{
	console.log('locals.total :',res.locals);
	let db=req.db;
	var locals=res.locals;
	db.collection('posts').find().limit(10).sort({_id:-1}).toArray((er,d)=>{
		if(er){console.log(er)}
	if(!er)res.send(articles_page.articles_page({buser:req.user,posts:d,locals}));
	});
	});

router.get('/labs',(req,res)=>{res.send("labs")}); 
//node index
/*
var articles_page_page=require('./views/articles_page_page');
 router.param('page',(req,res,next,page)=>{
	if(isNumb(page)==false){res.sendStatus(404);}else if(page==0){res.sendStatus(404)}else{next();}
})

router.get('/articles/:page',pagination,(req,res)=>{
	var locals=res.locals;
	if(locals.page <= locals.total_pages){
	res.send(articles_page_page.articles_page_page({locals}))}else{res.sendStatus(403)}
})
*/
/*
router.get('/profile',ensureAuthenticated,(req,res)=>{
	res.send(`<b>Hallo Admin!</b>`);
})
router.get('/alfa',(req,res)=>{res.send("OK")});
*/
/*
router.post('/login',passport.authenticate('login', {failureRedirect: '/login',failureFlash:true}),
(req, res)=> {res.redirect('/');});
router.get('/logout',(req,res)=>{req.logout();res.redirect('/')});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
*/
//router.get('/',(req,res)=>{res.send("Hallo world");})
app.use('/',router);
if(develop==app.get('env')){app.use(errorHandler());}
//node --harmony app
function flipdas(){flipbit=flipbit ^ 1;}
var server=http.createServer(app);
server.listen(app.get('port'),()=>{
console.log('Express server listening on port'+app.get('port'));});
function isNumb(str){var numstr=/^\d+$/;return numstr.test(str);}