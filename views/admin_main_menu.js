//admin_main_menu.js
var admin_main_menu=n=>`<div id="admin_main_menu">
<select id="operamini-menu-selector" onchange="showname1(this.value)">
<option value="">menu</option>
<option value="/">home</option>
<option value="/articles">articles</option>
<option value="/labs">labs</option>
</select></div>`;
module.exports={admin_main_menu};