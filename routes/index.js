// Load the twilio module
var twilio = require('twilio')
  	, cradle = require('cradle')
    , postmark = require("postmark")(process.env.POSTMARK_API_KEY);
 
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient('AC24575d92aa61d1e316f4fd7461a00ba0', '39e3617174572e50095c0c34401f58f3');
 
// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.


var connection = new(cradle.Connection)('https://liamflahive.cloudant.com', 443, {
      auth: { username: 'liamflahive', password: 'swatter5' }
  });


var db = connection.database('wheel');

exports.index = function(req, res){
  res.render('index', { title: 'Home' });
};


exports.sendSMS = function(request, response) {

var name = request.body.name
	, email = request.body.email
	, state = request.body.licenseplate
	, license = request.body.licensenumber
	, phone = request.body.phonenumber;
var phone = '+1'+phone;  

postmark.send({
    "From": "customersupport@wheeltalks.com",
    "To": email,
    "Subject": "Welcome to Wheeltalks",
    "TextBody": "Congratulations "+name,
    "Tag": "WheelTalks"
}, function(error, success) {
    if(error) {
        console.error("Unable to send via postmark: " + error.message);
       return;
    }
    console.info("Sent to postmark for delivery")
});	 

db.save(name, {
      email: email,
      plate: license,
      state: state,
      phone: phone
      
  });

console.log(request.body.name);



client.sms.messages.create({
to: phone,
from:'+17815594602',
body:'Welcome to WheelTalks! Save this number in your contacts.'
}, function(error, message) {
// The HTTP request to Twilio will run asynchronously. This callback
// function will be called when a response is received from Twilio
// The "error" variable will contain error information, if any.
// If the request was successful, this value will be "falsy"
if (!error) {
// The second argument to the callback will contain the information
// sent back by Twilio for the request. In this case, it is the
// information about the text messsage you just sent:
console.log('Success! The SID for this SMS message is:');
console.log(message.sid);
 
console.log('Message sent on:');
console.log(message.dateCreated);
}
else {
console.log('Oops! There was an error.');
}
})
response.render('about', { title: 'Home' });
};

exports.resSMS = function(request, response) {

var sender = request.body.from;
var body = request.param('Body').trim();
var arr = body.split(" ");
var command = arr[0];
var command = command.toUpperCase();

db.view('wheel/byPlate', {key: command}, function (err, res) {
    if (err) {
      console.log('Connection failed to be established')
      return;
    }
    else{
      if (res.length != 1) { //license plate does not exist
                response.send('<Response><Sms>This plate was not recognized :(</Sms></Response>');
                return;
              }
      else{
      var doc = res[0].value;
      var num = doc.phone;

      client.sms.messages.create({ //forward message to intended recipient
        to: num,
        from:'+17815594602',
        body: body
        });

      response.send('<Response><Sms>Thank you for using wheel talks!</Sms></Response>');
      }
    }
});

  };


