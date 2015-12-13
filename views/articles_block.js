//articles_block.js
'use strict';
var moment=require('moment');
var zagl=true;
var articles_block=n=>`${(n.posts ? getPosts(n) : ``)}${(zagl ? getZaglushkaPost(n) : ``)}`;
module.exports={articles_block};

function getPosts(n){
	let s2=``;
	n.posts.forEach(function(m,i){
	s2+=`<article class="fluiditems">
	<div id="redaktor">
	<ul class="red-nav">
	<li>X</li><li><a onclick="redaktorHref(this)" data-id="${m._id}" href="#popredaktor">redact</a></li>
<li data-id="${m._id}" onclick="removePost(this)">remove</li>
<li>visibility ${m.visa}</li></ul>
</div>
<!--<img src="/images/kuku.png" /> -->
<div class="foto-cont">
<img src="${(m.images ? m.images[0].src : `/images/kuku.png`)}"/></div>
<section class="article-info">
<div class="time-service"><b>${moment(m.created).format('MMM D, YYYY')}</b></div>
<div class="time-service"><b>comments 1</b></div>
<div class="time-service"><b>23 Shares</b></div>
<h5><a href="/articles/${m._id}/${m.title}">${m.postname} bobo obobob off.</a></h5>
<p>${m.shorti}</p>

<div class="tags">${sumLen(m)} </div>
</section>
<div class='art-pop'><p>Photos: ${(m.images ? m.images.length : `0`)}</p>
<p>Noch bla bla bla.</p></div>
</article>`;
});return s2;
}
function sumLen(len){let s=``;for(var i=0;i<len.meta.length;i++){s+=`<b>${len.meta[i]}</b>`;}return s;}
function getZaglushkaPost(n){
let s=``;s+=`<article class="fluiditems">
<div id="redaktor"><ul class="red-nav">
<li>X</li><li><a onclick="redaktorHref(this)" data-id="1" href="#popredaktor">redact</a></li>
<li data-id="1" onclick="removePost(this)">remove</li><li>visibility 1</li></ul></div>

<div class="foto-cont"><img src="/images/kuku.png"/></div>

<section class="article-info">
<div class="time-service"><b>16 25, 2016</b></div><div class="time-service"><b>comments 1</b></div>
<div class="time-service"><b>23 Shares</b></div><h5><a href="">Hallo World!..</a></h5><p>Sub head</p>
<div class="tags"><b>js</b><b>css3</b></div></section>

<div class='art-pop'><p>Photos: 0</p><p>Noch bla bla bla.</p></div></article>`;
return s;}