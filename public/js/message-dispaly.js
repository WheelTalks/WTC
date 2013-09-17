
'use strict';

var user = getCookie('user');

var couch = sag.server('localhost','5000');

couch.setPathPrefix('/db');
 
    // Set the database
    couch.setDatabase('messages');

    couch.login({
      user: 'liamflahive',
      pass: 'swatter5',
      type: couch.AUTH_BASIC
    });

    couch.get({
      url: '/'+user,
      callback: function(resp, success) {
      	var doc;
      	if(success) {
          var doc = resp.body;
          var inMessages = doc.recievedMssgLog;
          var inSenders = doc.senderLog
          var outMessages = doc.sentMssgLog;
          var outSentTo = doc.sentToLog
          for(var i = inMessages.length-1; i >= 0; i--){
				(function(foo){
				$(document).ready(function(){
					    $('#messagesSection').append("<div class='small-12 columns small-centered receivedWrapper'><div class='messageBox small-12 columns'><div class='row messageHead'><div class='from columns small-4'><p>From: <span class='fromName' id='from12345'>"+inSenders[foo]+"</span></p></div><div class='date columns right small-4'></div></div><div class='row contentWrapper'><div class='messageContent columns'><p><span class='contentRec' id='contentRec12345'>"+inMessages[foo]+"</span></p></div></div><ul class='messageFunctions columns'><li class='like'><a href='#likepost12345'>Like <i class='foundicon-up-arrow functionImage'></i></a></li><li class='dislike'><a id=dislike"+foo+" href='#dislikepost"+foo+"'>Dislike <i class='foundicon-down-arrow functionImage'></i></a></li><li class='reply'><a href='#replyPost12345'>Reply <i class='foundicon-add-doc functionImage'></i></a></li><li class='report'><a href='#reportPost12345'>Report <i class='foundicon-flag functionImage'></i></a></li><li class='archive'><a href='#archivePost12345'>Archive <i class='foundicon-trash functionImage'></i></a></li></ul></div></div> ");


					});
				}(i));
			};
		   for(var i = outMessages.length-1; i >= 0; i--){
				(function(foo){
				$(document).ready(function(){
					    $('#outbox').append("<div class='small-12 columns small-centered receivedWrapper'><div class='messageBox small-12 columns'><div class='row messageHead'><div class='from columns small-4'><p>To: <span class='fromName' id='from12345'>"+outSentTo[foo]+"</span></p></div><div class='date columns right small-4'></div></div><div class='row contentWrapper'><div class='messageContent columns'><p><span class='contentRec' id='contentRec12345'>"+outMessages[foo]+"</span></p></div></div><ul class='messageFunctions columns'><li class='like'><a href='#likepost12345'>Like <i class='foundicon-up-arrow functionImage'></i></a></li><li class='dislike'><a href='#dislikepost12345'>Dislike <i class='foundicon-down-arrow functionImage'></i></a></li><li class='reply'><a href='#replyPost12345'>Reply <i class='foundicon-add-doc functionImage'></i></a></li><li class='report'><a href='#reportPost12345'>Report <i class='foundicon-flag functionImage'></i></a></li><li class='archive'><a href='#archivePost12345'>Archive <i class='foundicon-trash functionImage'></i></a></li></ul></div></div> ");
					});
				}(i));
			};
        }
        else if(resp._HTTP.status == 404) {
          alert('boo');
          };
      $(document).ready(function(){
        $( ".dislike" ).click(function() {
          alert( "Handler for dislike.click() called." );
        });
      });
      $(document).ready(function(){
        $( ".like" ).click(function() {
          alert( "Handler for like.click() called." );
        });
      });
      $(document).ready(function(){
        $( ".reply" ).click(function() {
          alert( "Handler for reply.click() called." );
        });
      });

      $(document).ready(function(){
        $( ".report" ).click(function() {
           doc.blocked[doc.blocked.length] = "blockme";
           console.log('attempting put')
           updateDoc(doc);
           });
      });
    }
  });

  function updateDoc(doc){
       couch.put({
       id: doc._id, 
       data: doc,
       callback: function(resp, success) {
        if(success) {
          console.log(resp);
          console.log('Done!');
        }
        else {
          console.log('Error updating blog post: HTTP ' + resp._HTTP.status);
        }
      }
       });
     }
    
      // $(document).ready(function(){
      //   $( ".archive" ).click(function() {
      //     alert( "Handler for archive.click() called." );
      //   });
      // });

  




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
