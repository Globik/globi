//header_menu.js
var sign_up=false;
var header_menu=(n)=>
`<ul id="menu"> 
<li><a href="/">home</a>
<li><a href="/articles">articles</a>
<li><a href="/labs">labs</a>
</ul>

<label id="lb-menu-all" class="lb-menu-all" 
onclick="dowas1()">
 <div class="spinner diagonal part-1"></div>
 <div class="spinner horizontal"></div>
 <div class="spinner diagonal part-2"></div>
</label>
<ul id="miniMenu" class="">
<li><div id="enc" class="znak-svg">pic</div>
<a href="/">home-1</a>
 </li>
<li><div class="znak-svg">pic</div>
<a href="/articles">articles</a>
<li><div class="znak-svg">pic</div><a href="/labs">labs</a>
${(n.buser ? `<li><div class="znak-svg">pic</div><a href="/profile">profile</a>`:``)}
${(n.buser ? `<li><div class="znak-svg">pic</div><a href="/logout" id="login_pop">log out</a>`:`<li><div class="znak-svg">pic</div><a href="/login">log in</a></li>`)}
${(sign_up ? `<li><div class="znak-svg">pic</div><a href="#join_form" id="join_pop">sign up</a>` :``)}
</ul>

<script>
var duri=gbid("duri"),elmini=gbid("operamini-menu-selector"),minmen=gbid('miniMenu'),
lb=gbid('lb-menu-all'),dsel=document.querySelectorAll('label .spinner');
var mainP=gbid('enc');
var gr=true;
function dowas1(){
if(gr){minmen.className="touch-mini-menu";
minmen.style.display="block";
lb.classList.add('active');
//dsel.classList.add('active');
sumor(dsel,'active');
//for(var i=0;i<dsel.length;i++){dsel[i].classList.add('active');}
gr=false;}
else{minmen.className="";minmen.style.display="none";
lb.classList.remove('active');
//dsel.classList.remove('active');
sumor(dsel,'active');
gr=true;}
}
document.body.onload=shalter;
	function shalter(){
document.querySelector('#pagewrap').onclick=clickshalter;
/*document.querySelector('#pagewrap').ontouchstart=clickshalter;*/
function clickshalter(){
	minmen.className="";
	minmen.style.display="none";
	lb.classList.remove("active");
	sumor(dsel,'active');
	gr=true;
}
	
	
	}
	

var isOperaMini = (navigator.userAgent.indexOf('Opera Mini')>-1);
if(isOperaMini){
duri.style.display="none";
elmini.style.display="block";}
function showname1(el){window.location.href=el;}
function gbid(id){return document.getElementById(id)}
function sumor(el,clas){
	for(var i=0;i<el.length;i++){if(el[i].classList.contains(clas)==false){
	el[i].classList.add(clas);}else{el[i].classList.remove(clas)}
		}}
</script>`;
module.exports={header_menu};