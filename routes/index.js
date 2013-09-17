// Load the twilio module
var AM = require('./modules/account-manager');
var ML = require('./modules/message-logger');
var twilio = require('twilio')
  	, cradle = require('cradle')
    , postmark = require("postmark")("15ea587a-4786-4d15-b71f-927b3a503ba6")


 
var client = new twilio.RestClient('AC24575d92aa61d1e316f4fd7461a00ba0', '39e3617174572e50095c0c34401f58f3');

var connection = new(cradle.Connection)('https://liamflahive.cloudant.com', 443, {
      auth: { username: 'liamflahive', password: 'swatter5' }
  });

var accounts = connection.database('accounts');//user accounts
var messages = connection.database('messages');
/* ------------------------------------------------ */
/*           Serves up the index page               */
/* ------------------------------------------------ */
exports.index = function(req, res){
	if(req.param('logout') == 'true'){
			console.log('clearing cooks');
			res.clearCookie('user');
			res.clearCookie('pass');
			req.session.destroy();
			res.render('index', { title: 'Home' });
		}
	else if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('index', { title: 'Home' });
		}	else{
	// attempt automatic login //
			AM.autoLogin(req.cookies.user, req.cookies.pass, function(e, o){
				if (o != null){
				    req.session.user = o;
					res.redirect('/webApp');
				}	else{
					res.render('index', { title: 'Home' });

				}
			});
		}
};

/* ------------------------------------------------ */
/*                 Sign up process                  */
/* ------------------------------------------------ */

exports.sendSMS = function(request, response) { //SignUp

var name = request.body.name
	, email = request.body.email
	, state = request.body.licenseplate.trim()
	, license = request.body.licensenumber.trim()
	, phone = request.body.phonenumber;
var phone = '+1'+phone; 
var phone2 = phone;
var emailBody;
license = license.toUpperCase();
state = state.toUpperCase();
license = state+license;
plate = license
var pass = request.body.password;




var data = {
	  name: name, 
      email: email,
      plate: license,
      pass: pass,
      phone: phone,
      score: 1,
      last: null
      
  }

AM.addNewAccount(data, function(res){
	console.log(res);
	if(res = 'account-created'){
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
		response.redirect('/loginPage');
	}

	else{
           response.redirect('/signUp?plateTaken=true')      
        }
    });

	var senderLog = [];
	var recievedMssgLog = [];
	var sentMssgLog = [];
	var sentToLog = [];
	var blocked = [];

	messages.save(plate,
	{
			plate: plate,
	    	phone: phone2,
	    	senderLog: senderLog,
	    	recievedMssgLog: recievedMssgLog,
	    	sentToLog: sentToLog,
	    	sentMssgLog: sentMssgLog,
	    	blocked: blocked
	});
}



// AM.manualLogin(userLogin, request.param('password'), function(e, o){
// 			if (!o){
// 				response.send(e, 400);
// 			}	else{
// 			    request.session.user = o;
// 					response.cookie('user', o.plate, { maxAge: 900000 });
// 					response.cookie('pass', o.pass, { maxAge: 900000 });
// 					console.log('login sucessful');
// 				response.send(o, 200);
// 				response.redirect('/webApp');
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
		accounts.view('accounts/byPhone', {key: sender}, function (err, res) {//view sender
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
				accounts.view('accounts/byPhone', {key: last}, function (err, res) {//view winner 
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

						    client.sms.messages.create({ //forward message to intended recipient
					        to: num_w,
					        from:'+17815594602',
					        body: infMssg
					        });
						    winner.score = winner.score+infChange
						    accounts.save(winner._id, winner);

					        
						}
					}
				});//close winner view
	  			}
	  		}
	  		});//close sender view
	break;

	case '$':
		accounts.view('accounts/byPhone', {key: sender}, function (err, res) {//view sender
	    if (err) {
	      console.log('Connection failed to be established')
	      return;
	    }
	    else{
	      if (res.length != 1) { //license plate does not exist
	        response.send('<Response><Sms>Sign up for WheelTalks to start getting influence!</Sms></Response>');
	        }
	      
	        
	              
	      else{
		      var doc = res[0].value;
		      var influence = doc.score;
		      response.send('<Response><Sms>You currently have '+influence+' influence</Sms></Response>');
		  }
		}
	});
	break;

	default:
	accounts.view('accounts/byPlate', {key: command}, function (err, res) {
	    if (err) {
	      console.log('Connection failed to be established')
	      return;
	    }
	    else{
	      if (res.length != 1) { //license plate does not exist
	        response.send("<Response><Sms>This user hasn't signed up for WheelTalks yet, but you're message will be waiting for them. Spread the word so all car owners can start communicating!</Sms></Response>");
	        talks.save("", {
	          plate: command,
	          message: body,
	        });
	      
	      }  
	              
	      else{
		      var doc = res[0].value;

		      accounts.view('accounts/byPhone', {key: sender}, function (err, res) {//view sender
			    if (err) {
			      console.log('Connection failed to be established')
			      return;
			    }
			    else{
			      if (res.length < 1) { //license plate does not exist
			        ML.sendMessage(num, 'Unregistered', body);
			        }			      			     			              
			      else{
				      var doc = res[0].value;
				      var plate = doc.plate;
				      ML.sendMessage(num, plate, body);
				      ML.logSend(plate, command, body);
				  }
				}
			});
		       doc.last = sender;
		       accounts.save(doc._id, doc);
		      response.send('<Response><Sms>Your message has been sent. Thank you for using wheel talks!</Sms></Response>');
	  			}
	  		}
		});//close view
    }//close switch  
};//close resSMS

/* ------------------------------------------------ */
/*        Send messages from the app                */
/* ------------------------------------------------ */

exports.webSend = function(request, response) {
	var plate = request.param('licensenumber').trim().toUpperCase(),
		state = request.param('state').trim().toUpperCase(),
		mssg = request.param('textbody');
		console.log('in websend');
	var command =state + plate;
		accounts.view('accounts/byPlate', {key: command}, function (err, res) {
			console.log('attempting lookup');
	    if (err) {
	      console.log('Connection failed to be established')
	      return;
	    }
	    else{
	      if (res.length < 1) {
	        console.log('failed to find plate') //license plate does not exist
	      response.redirect('/');
	      }  
	              
	      else{
		      var doc = res[0].value;
		      var plate = doc.plate;
		      var num = doc.phone;

		    ML.sendMessage(num, request.cookies.user, mssg);
		    ML.logSend(request.cookies.user, plate, mssg);

		       response.redirect('/');
	  			}
	  		}
		});


};

/* ------------------------------------------------ */
/*        Handle the log in process                 */
/* ------------------------------------------------ */

exports.logIn = function(req, res){
		var user = req.param('user').trim().toUpperCase();

		AM.manualLogin(user, req.param('pass'), function(e, o){
			if (!o){
				res.send(e, 400);
				res.redirect('/loginPage?loginFail='+e);
			}	else{
			    req.session.user = o;
					res.cookie('user', o.plate, { maxAge: 365 * 24 * 60 * 60 * 1000 });
					res.cookie('pass', o.pass, { maxAge: 365 * 24 * 60 * 60 * 1000 });
					console.log('login sucessful');
				res.send(o, 200);
				res.redirect('/webApp');
			}
		});
	};
// 

// db.view('wheel/byPlate', {key: license}, function (err, res) {
//     if (err) {
//       console.log('Connection failed to be established')
//       return;
//     }
//     else{
//       if (res.length < 1) { //license plate does not exist
//         console.log('plate is good')
//         talks.view('talks/byPlate', {key: license}, function (err, res) {
//     if (err) {
//       console.log('Connection failed to be established')
//       return;
//     }
//     else{
//       if (res.length < 1) { //license plate does not exist
//         emailBody = "You haven't recieved any messages yet.";

//         postmark.send({ //send a welcome email
//           "From": "welcome@wheeltalks.com",
//           "To": email,
//           "Subject": "Welcome to Wheeltalks",
//           "TextBody": "Congratulations "+name +"\n" + emailBody,
//           "Tag": "WheelTalks"
//           }, function(error, success) {
//               if(error) {
//                   console.error("Unable to send via postmark: " + error.message);
//                  return;
//               }
//               console.info("Sent to postmark for delivery")
//           });

//         }
              
//       else{
//         var doc = res[0].value;
//         var savedMssg = doc.message;

//         emailBody = "People have already been trying to contact you. \nThese are your saved messages:\n \n     \""
//                     + savedMssg + "\" \n \n"
//                     + "We are excited to have you join the Wheel Talks community. \nYou will find that your fellow wheeltalkers have alot to offer.\n"
//                     + "\n Feel free to reply to this email with questions as it will be sent to our customer support staff.\n \nSincerely,\n  -The WheelTalks Crew";
//         postmark.send({ //send a welcome email
//           "From": "welcome@wheeltalks.com",
//           "To": email,
//           "Subject": "Welcome to Wheeltalks",
//           "TextBody": "Congratulations! "+name +",\n" + emailBody,
//           "Tag": "WheelTalks"
//           }, function(error, success) {
//               if(error) {
//                   console.error("Unable to send via postmark: " + error.message);
//                  return;
//               }
//               console.info("Sent to postmark for delivery")
//           });              
//         }
//       }
//     });



