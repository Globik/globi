var express=require('express');

var router=express.Router();
var fs=require('fs');


router.post('/angaben',function(req,res){
var db=req.db;
console.log(req.body.name);//yes!!=>val pit
console.log(req.body);
db.collection('tasks').save({task:req.body.name,completed:false},
function(err,task){
if(err) throw err;
console.log('added: '+req.body.name);});
//console.log(JSON.parse(req.body.name));
res.send(req.body);
});



router.get('/paramorig',function(req,res){
var db = req.db;
db.collection('tasks').find().toArray(function(err,result){
if(err)throw err;

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

router.post('/savedit',function(req,res){
var db = req.db;
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




router.post('/delta',function(req,res){
//db.collection('tasks').removeById(req.body.del,function(err,count){
//if(err)throw err;
//console.log("deleted via verv delete :"+req.params.id);
console.log(req.body.name);
res.send("OK");
//});
});

router.get('/alfa/:name',function(req,res){
console.log('req.params.name :'+req.params.name);
console.log('req.body.name :'+req.body.name);
console.log('req.body :'+ req.body);
console.log('req.name :'+ req.name);
console.log('req.etwas :'+req.etwas);
fs.readFile('./views/header.ejs','utf-8',function(err,data){
console.log(data);
res.send('get sapros and req.params.name - OK and '+req.params.name+' data :'+data);
});
});

router.delete('/delete/:id',function(req,res){
var db=req.db;
db.collection('tasks').removeById(req.params.id,function(err,count){
if(err)throw err;
console.log("deleted :"+req.params.id);

res.send("OK");
});
});




router.delete('/deletetask/:id', function(req, res) {



/***

    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
***/
console.log('req.params.id :'+req.params.id);
res.send('req.params.id :'+req.params.id);
});

/***
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
***/

module.exports = router;