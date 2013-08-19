
var twilio = require('twilio');

var client = new twilio.RestClient('AC24575d92aa61d1e316f4fd7461a00ba0', '39e3617174572e50095c0c34401f58f3');

var cradle = require('cradle');

var connection = new(cradle.Connection)('https://liamflahive.cloudant.com', 443, {
      auth: { username: 'liamflahive', password: 'swatter5' }
  });

var messages = connection.database('messages');


exports.sendMessage = function(numTo, plateFrom, body){
	client.sms.messages.create({ //welcome text
to: numTo,
from:'+17815594602',
body: body
}, function(error, message) {

if (!error) {

console.log('Success! The SID for this SMS message is:');
console.log(message.sid);
 
console.log('Message sent on:');
console.log(message.dateCreated);
}
else {
console.log('user-not-found')
}
})

messages.view('messages/byPhone', {key: numTo}, function (e, o) {
	if (e) {
      console.log('Connection failed to be established')
      return;
    }
    if (o.length < 1) {
      console.log('user-not-found');
    }
    else{
    	var doc = o[0].value;
    	var plate = doc.plate;
    	var phone = doc.phone;
    	var senderLog = doc.senderLog;
    	var recievedMssgLog = doc.recievedMssgLog;
    	var sentToLog = doc.sentToLog;
    	var sentMssgLog = doc.sentMssgLog;
    	var index = recievedMssgLog.length;
    	senderLog[index] = plateFrom;
    	recievedMssgLog[index] = body;

    	messages.save(doc._id, {
    		plate: plate,
    		phone: phone,
    		senderLog: senderLog,
    		recievedMssgLog: recievedMssgLog,
    		sentToLog: sentToLog,
    		sentMssgLog: sentMssgLog
    	});
    	console.log('message-sent');
			}
		});
    };
exports.logSend = function(senderPlate, plateTo, body){
	messages.view('messages/byPlate', {key: senderPlate}, function (e, o) {
		if (e) {
	      console.log('Connection failed to be established')
	      return;
	    }
	    if (o.length < 1) {
	      console.log('user-not-found');
	    }
	    else{
	    	var doc = o[0].value;
	    	var plate = doc.plate;
	    	var phone = doc.phone;
	    	var senderLog = doc.senderLog;
	    	var recievedMssgLog = doc.recievedMssgLog;
	    	var sentToLog = doc.sentToLog;
	    	var sentMssgLog = doc.sentMssgLog;
	    	var index = sentMssgLog.length;
	    	sentToLog[index] = plateTo;
	    	sentMssgLog[index] = body;

	    	messages.save(doc._id, {
	    		plate: plate,
	    		phone: phone,
	    		senderLog: senderLog,
	    		recievedMssgLog: recievedMssgLog,
	    		sentToLog: sentToLog,
	    		sentMssgLog: sentMssgLog
	    	});
	    	console.log('sent-message-saved');
				}
			});
	    };




