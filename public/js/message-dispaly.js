
'use strict';

// var request = new XMLHttpRequest();
// request.open("GET", "https://liamflahive:swatter5@liamflahive.cloudant.com/wheel/_all_docs", false);
// request.send("");
// //alert(request.responseText);
var couch = sag.server('localhost', 5000);

couch.setPathPrefix('/db');
 
    // Set the database
    couch.setDatabase('wheel');

    couch.login({
      user: 'liamflahive',
      pass: 'swatter5',
      type: couch.AUTH_BASIC
    });

    couch.get({
      url: '/RA',
      callback: function(resp, success) {
      	var doc;
      	if(success) {
          var doc = resp.body;
          $(document).ready(function(){
		    $('.content').append('<p>'+ doc.plate +'</p>');
			});
        }
        else if(resp._HTTP.status == 404) {
          alert('boo');
          };
      }
  	});



//var res = JSON.parse($db);

// instantiate a new XMLHttpRequest object
// var req = new XMLHttpRequest()
// // Open a GET request to "/all_dbs"
// req.open("GET", "https://liamflahive:swatter5@liamflahive.cloudant.com/_all_dbs")
// // Send nothing as the request body
// req.send("")
// // Get the response
// var res = JSON.parse(req.responseText);
//alert(res);

var messages = [];
messages[0] = 'Hi there';
messages[1]= "nice car"
messages[2]= "cool face"


for(var i = 0; i < messages.length; i++){
	(function(foo){
	$(document).ready(function(){
		    $('.content').append('<p>'+ messages[foo] +'</p>');
		});
	}(i));
};



function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
{
c_start = c_value.indexOf(c_name + "=");
}
if (c_start == -1)
{
c_value = null;
}
else
{
c_start = c_value.indexOf("=", c_start) + 1;
var c_end = c_value.indexOf(";", c_start);
if (c_end == -1)
{
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}
