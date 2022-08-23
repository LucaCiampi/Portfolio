function _(id){ return document.getElementById(id); }
function submitForm(){
	_("contact_button").disabled = true;
	_("status").innerHTML = 'please wait ...';
	var formdata = new FormData();
	formdata.append( "contact_name", _("contact_name").value );
	formdata.append( "contact_mail", _("contact_mail").value );
	formdata.append( "contact_message", _("contact_message").value );
	var ajax = new XMLHttpRequest();
	ajax.open( "POST", "../controler/contact.php" );
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4 && ajax.status == 200) {
			if(ajax.responseText == "Success"){
				_("contact_form").innerHTML = '<div id="thanksMessage">Thanks <span id="yourContactName">'+_("contact_name").value+',</span> your message has been sent.</div>';
			} else {
				_("status").innerHTML = ajax.responseText;
				_("contact_button").disabled = false;
			}
		}
	}
	ajax.send( formdata );
}