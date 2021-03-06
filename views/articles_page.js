// articles_page.js 
'use strict'; 
var head=require('./head.js'),
header_menu=require('./header_menu.js'),
admin_main_menu=require('./admin_main_menu.js'),
articles_block=require('./articles_block.js'),
paginator=require('./paginator.js'),
footer=require('./footer.js');

var articles_page=(n)=>`<!DOCTYPE html><html lang="en">
<head>${head.head({title:"Articles Page",csslink:`${getCssLink()}`})}</head>
<body><nav class="back">${header_menu.header_menu({buser:n.buser})}</nav>
${(n.buser ? `${admin_main_menu.admin_main_menu({})}`:``)}
<main id="pagewrap">
<section class="daper"><h1>Articles</h1>
${articles_block.articles_block(n)}
</section>
${(n.locals.total_pages > 1 ? `<div id="pagination">${paginator.paginator(n)}</div>`: ``)}
</main><footer id="footer3">  ${footer.footer({boo:"BOA"})}</footer></body></html>`;
module.exports={articles_page};
function getCssLink(){return `<link href="/css/articles-paginator.css" rel="stylesheet">`;}