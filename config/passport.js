// config/passport.js
var crypto=require('crypto');
var  scmp=require('scmp');
var ObjectID=require('mongodb').ObjectID;
var LocalStrategy=require('passport-local').Strategy;

module.exports=(db,passport)=>{

passport.serializeUser((user, done)=> done(null, user._id));
passport.deserializeUser((_id, done)=> {
db.collection('users').findOne({_id:ObjectID(_id)},(err,user)=>{
if(err){console.log(err);return done(err);}
done(null,user);
});
});

passport.use('login',new LocalStrategy({passReqToCallback:true},(req,username,password,done)=>{
	process.nextTick(()=>{
		db.collection('users').findOne({'username':username},(err,user)=>{
if(err){console.log('er in db :',er);/*return done(err);*/}
		//if(user == null || username !==user.username){
			if(!user){
		return done(null,false,req.flash('message',"User Not Found"))}
		/*if(password !==user.password){return done(null,false)}*/
crypto.pbkdf2(password,/*user.salt*/'salt',10000,64,(er,bi)=>{
if(er){return done(er);}
/*
if(bi.toString('base64') !==user.password){console.log("NO-NO");return done(null,false);} */

if(scmp(bi.toString('base64'),user.password)){
return done(null,user);}
else{
return done(null,false,req.flash('message','Invalid Password!'));
}

 })

	});});
}));


}

/*
var gag=new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
crypto.randomBytes(16,(ex,buf)=>{
if(ex)console.log(ex);
console.log('buf :',buf.toString('base64'))	;
crypto.pbkdf2('secret','salt',10000,64,(er,res)=>{
	if(er)console.log(er);
	console.log('result pw :',res.toString('hex'));
	var saka=(res.toString('base64')== res.toString('base64') ? console.log('yes'):console.log('no'));
	var li=db.b.collection('users');
	li.findOne({username:"Bob"},{$set:{password:res.toString('base64'),salt:'salt'}},(er,d)=>{
		if(er)console.log(er);
		//console.log(d);
		crypto.pbkdf2('secret',d.salt,10000,64,(er,bi)=>{
			if(er)console.log(er);
			var ws=(bi.toString('base64')==d.password ? console.log('YES') : console.log("NO"))
		})
		
	})
})
})
var es=crypto.pbkdf2Sync('secret',gag,10000,64).toString('base64');

console.log('gag :',gag);
console.log('pw :',es);

*/