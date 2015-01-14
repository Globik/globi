//!!!! routes/index.js !!!!

var express=require('express');
var router=express.Router();
var passport=require('passport');

router.get('/', function(req, res) {
var db=req.db;
var drinks=[
{name:'Bloody Mary',drunk:3},
{name:'Alik',drunk:5},
{name:'Dima',drunk:10}
];

db.collection('tasks').find().toArray(function(err,result){
if(err)throw err;

  res.render('index', { drinks:drinks, title: 'Express',user:req.user,resul:result});
});});
module.exports = router;

