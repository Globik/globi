var express = require('express');
var passport=require('passport');
var router = express.Router();


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

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});


router.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


/* GET home page. */
/***
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
***/

module.exports = router;