//login.js
var head=require('./head'),
    header_menu=require('./header_menu');
    //footer=require('./footer'); 
var login=(n)=>
`<!DOCTYPE html><html lang="en"><head>${head.head({title:"Log in"})}</head>
<body><nav class="back">${header_menu.header_menu({})}</nav>
<main id="pagewrap" style="backround:pink;">
 
<style>
*{box-sizing:border-box;}
html{height:0%;}
body{-webkit-font-smoothing:antialised;backround:violet;}
hgroup{text-align:center;}
/*h1,h3{font-weight:300}*/
input::-webkit-input-placeholder,button{
	/*font-family:,sans-serif;*/
	-webkit-transition:all 0.3s ease-in-out;
	transition:all 0.3s ease-in-out;
	}
h2{
height:100px;
width:100%;
/*font-size:*/
background:#18aa8d;
color:white;
line-height:3.5;
/*border:4px solid green;*/
border-radius:3px 3px 0 0;
margin-bottom:0;
margin-top:0;
text-align:center;
box-shadow:0 2px 5px 1px rgba(0,0,0,0.2);
}
.group{position:relative;margin-bottom:5px;}
.form-box{
	padding:0;
	margin:0 auto 0;
	width:38rem;
	ax-width:38rem;
	overflow:hidden;
	box-shadow:2px 2px 2px 1px rgba(0,0,0,0.2);
}
form{
margin:0em auto 0;
padding:3em 2em 2em 2em;
background:#fafafa;
border:1px solid #ebebeb;
border-radius: 0 0 3px 3px;
/*box-shadow:rgba(0,0,0,0.14902)
0px 1px 1px 0px,rgba(0,0,0,0.09804)
0px 1px 2px 0px;*/
}
@media screen and (max-width: 650px) {
	.form-box{width:100%;}
	.form-box h2{line-height:2.5;}
	form{padding:0;}
	h2{width:100%;}
}
input{
display:block;
background:#fafafa;
height:4.3rem;
width:100%;
border:none;
margin-bottom:40px;
padding:10px 10px 10px 5px;
-webkit-appearance:none;
border-bottom:solid 1px  #1abc9c;
-webkit-transition:all 0.3s cubic-bezier(0.64,0.09,0.08,1);
background:-webkit-linear-gradient(top,rgba(255,255,255,0) 96%,#1abc9c 4%);
background:linear-gradient(to bottom,rgba(255,255,255,0) 96%,#1abc9c 4%);
background-position:-100rem 0;
overflow:hidden;

background-size: 100% 100%;
background-repeat:no-repeat;
color:#0e6252;

/*font-size:1.4em;*/
}
input:focus,input:valid{
	box-shadow:none;
outline:none;
background-position:0 0;}
input:focus::-webkit-input-placeholder,input:valid::-webit-input-placeholder{
	color:#1abc9c;
	/*font-size:11px*/
	transform:translateY(10rem);
	z-index:100;
	visible !important;
}
button{
	display:inline-block;
	position:relative;
	border:none;
	background:#1abc9c;
	cursor:pointer;
	border-radius:3px;
	border-bottom:2px solid transparent;
	padding:12px 24px;
	margin: 0.3em 0 1em 0;
	width:100%;
	vertical-align:middle;
	letter-spacing:1px;
	color:white; 
	box-shadow:0 3px 6px 0 rgba(0,0,0,0.2);
	}  
button:hover{
	transform:translateY(-1px);
	box-shadow:0 6px 6px 0 rgba(0,0,0,0.2);
}  
form p{margin-top:20px;padding:1px;color:#0e6252;}
form p a{color:#0e6252;}
#red-warnig{position:absolute;top:100px;left:100px;padding:10px;background:rgba(255,0,0,0.5);opacity:1;}
</style>
${(n.message.length > 0 ? `<span id="red-warnig">${n.message}</span>` : ``)}
<div class="form-box">
<h2>ki</h2>
<form action="/login" method="post">
<div class="group">
<input type="text" name="username" value="" placeholder="Username" required />
<input type="password" name="password" value="" placeholder="Password" required />
</div>
<button>Sign In</button>
<p>No account yet? <a href="">Create one</a></p>
<!-- Already a member? Login -->
</form>
</div>
</main></body></html>`;

module.exports={login};