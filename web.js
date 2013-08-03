var express = require('express')	// express is pretty much a must have module to make life easier
	, app = express()
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, server = http.createServer(app) 		// create the actual server

	// nano is a module for managing databases. you'll work with this later.
//	, nano = require('nano')
	, port = process.env.PORT || 5000;

// this starts the server
server.listen(port);

// this tells node to use the public folder for your webpage -- everything there is, well, public. 
// realize that this means the folder in which this web.js file sits is private -- that is, it's *server-side*
app.configure( function() {
	app.use( express.static(__dirname + '/public') );
	app.use(express.favicon());
    app.use(express.logger('dev'));
	app.use( express.bodyParser() );
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// ignore this block for now -- not critical to basic understanding of node
app.all('/', function(request, response, next) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

/* --------- routes -------------- */

// 'routes' are instructions for urls

// this is what serves up your home page. So, if someone types "www.wheeltalk.com", this is the page they see
app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

// your homework -- create a route that serves up a different page. So, I want to be able to go to "www.wheeltalk.com/about" to learn more about the team. 


// this is the REST api you'll need to create to sign up a new user
app.post( '/users/new', routes.sendSMS);
