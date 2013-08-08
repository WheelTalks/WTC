// Load the twilio module
var twilio = require('twilio')
  	, cradle = require('cradle')
    , postmark = require("postmark")("15ea587a-4786-4d15-b71f-927b3a503ba6")
 
var client = new twilio.RestClient('AC24575d92aa61d1e316f4fd7461a00ba0', '39e3617174572e50095c0c34401f58f3');

var connection = new(cradle.Connection)('https://liamflahive.cloudant.com', 443, {
      auth: { username: 'liamflahive', password: 'swatter5' }
  });

var db = connection.database('wheel'); //user db
var talks = connection.database('talks');//saved messages db

/* ------------------------------------------------ */
/*           Serves up the index page               */
/* ------------------------------------------------ */
exports.index = function(req, res){
  res.render('index2', { title: 'Home' });
};

/* ------------------------------------------------ */
/*                 Sign up process                  */
/* ------------------------------------------------ */

exports.sendSMS = function(request, response) {

var name = request.body.name
	, email = request.body.email
	, state = request.body.licenseplate.trim()
	, license = request.body.licensenumber.trim()
	, phone = request.body.phonenumber;
var phone = '+1'+phone;  

var emailBody;


license = license.toUpperCase();
state = state.toUpperCase();
license = state+license;

talks.view('talks/byPlate', {key: license}, function (err, res) {
    if (err) {
      console.log('Connection failed to be established')
      return;
    }
    else{
      if (res.length < 1) { //license plate does not exist
        emailBody = "You haven't recieved any messages yet.";

        postmark.send({ //send a welcome email
          "From": "welcome@wheeltalks.com",
          "To": email,
          "Subject": "Welcome to Wheeltalks",
          "TextBody": "Congratulations "+name +"\n" + emailBody,
          "Tag": "WheelTalks"
          }, function(error, success) {
              if(error) {
                  console.error("Unable to send via postmark: " + error.message);
                 return;
              }
              console.info("Sent to postmark for delivery")
          });

        }
              
      else{
        var doc = res[0].value;
        var savedMssg = doc.message;

        emailBody = "People have already been trying to contact you. \nThese are your saved messages:\n \n     \""
                    + savedMssg + "\" \n \n"
                    + "We are excited to have you join the Wheel Talks community. \nYou will find that your fellow wheeltalkers have alot to offer.\n"
                    + "\n Feel free to reply to this email with questions as it will be sent to our customer support staff.\n \nSincerely,\n  -The WheelTalks Crew";
        postmark.send({ //send a welcome email
          "From": "welcome@wheeltalks.com",
          "To": email,
          "Subject": "Welcome to Wheeltalks",
          "TextBody": "Congratulations! "+name +",\n" + emailBody,
          "Tag": "WheelTalks"
          }, function(error, success) {
              if(error) {
                  console.error("Unable to send via postmark: " + error.message);
                 return;
              }
              console.info("Sent to postmark for delivery")
          });              
        }
      }
    });

db.save(name, { //add the user
      email: email,
      plate: license,
      phone: phone,
      score: 1,
      last: null
      
  });


client.sms.messages.create({ //welcome text
to: phone,
from:'+17815594602',
body:'Welcome to WheelTalks! Save this number in your contacts.'
}, function(error, message) {

if (!error) {

console.log('Success! The SID for this SMS message is:');
console.log(message.sid);
 
console.log('Message sent on:');
console.log(message.dateCreated);
}
else {
console.log('Oops! There was an error.');
}
})
response.render('about', { title: 'Home' }); //serve up post-signup page
};

/* ------------------------------------------------ */
/*        Texting Service Function                  */
/* ------------------------------------------------ */

exports.resSMS = function(request, response) {

var sender = request.param('From').trim();;
var body = request.param('Body').trim();
var arr = body.split(" ");
var command = arr[0];
var command = command.toUpperCase();

switch(command){
	case ":)", ":(":
		if(command == ':)') {
			var infChange = 10,
				infMssg = "It seems like your gaining some serious Influence in your community. Keep it up :D";

		}
		else{
			var infChange = -2,
			infMssg = "You've lost some Influence. It probably wasn't your fault. We still think your awesome.";
		}	
		db.view('wheel/byPhone', {key: sender}, function (err, res) {//view sender
	    if (err) {
	      console.log('Connection failed to be established')
	      return;
	    }
	    else{
	      if (res.length != 1) { //license plate does not exist
	        response.send('<Response><Sms>Sign up for WheelTalks!</Sms></Response>');
	        }
	      
	        
	              
	      else{
		      var doc = res[0].value;
		      var last = doc.last;
				db.view('wheel/byPhone', {key: last}, function (err, res) {//view winner 
					if (err) {
						console.log('Connection failed to be established')
					return;
					}
					else{
						if (res.length != 1) { 
							return;
						}
						else{
							var winner = res[0].value;
						    var email_w = winner.email;
						    var plate_w = winner.plate;
						    var num_w = winner.phone;
						    var score_w = winner.score;
						    var last_w = winner.last;

						    client.sms.messages.create({ //forward message to intended recipient
					        to: num_w,
					        from:'+17815594602',
					        body: infMssg
					        });

						    db.save(winner._id, { //add the new sender
					        email: email_w,
					        plate: plate_w,
					        phone: num_w,
					        score: score_w + infChange,
					        last:  last_w });

					        
						}
					}
				});//close winner view
	  			}
	  		}
	  		});//close sender view
	break;

	default:
	db.view('wheel/byPlate', {key: command}, function (err, res) {
	    if (err) {
	      console.log('Connection failed to be established')
	      return;
	    }
	    else{
	      if (res.length != 1) { //license plate does not exist
	        response.send('<Response><Sms>This plate was not recognized :(</Sms></Response>');
	        talks.save("", {
	          plate: command,
	          message: body,
	        });
	      
	      }  
	              
	      else{
		      var doc = res[0].value;
		      var email = doc.email;
		      var plate = doc.plate;
		      var num = doc.phone;
		      var score = doc.score;
		      var last = doc.last;


		      client.sms.messages.create({ //forward message to intended recipient
		        to: num,
		        from:'+17815594602',
		        body: body
		        });

		       db.save(doc._id, { //add the new sender
		       email: email,
		       plate: plate,
		       phone: num,
		       score: score + 1,
		       last: sender });
		      response.send('<Response><Sms>Your message has been sent. Thank you for using wheel talks!</Sms></Response>');
	  			}
	  		}
		});//close view
    }//close switch  
};//close resSMS

// findBy = exports.findBy = function(method, val, callback) {
// events.view(method, {key: val}, function (err, res) { 
//   	      if (err) {
//   	      	console.log('Connection failed to be established')
// 	      return;
//   	      }
//   	      else{
//   	      	if (res.length != 1) { 
//   	      		callback(null);
//   	      	}
//   	      	else{
//   	      		callback(res[0]);
//   	      	}
//   	      }
//   	  });//close view

// };



