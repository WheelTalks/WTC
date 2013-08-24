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
	app.set('views', __dirname + '/views');
    app.set('view engine', 'hjs');
    app.locals.pretty = true;
	app.use(express.favicon());
    app.use(express.logger('dev'));
	app.use( express.bodyParser() );
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'super-duper-secret-secret' }));
	app.use(express.methodOverride());
	app.use(app.router);
	app.use( express.static(path.join(__dirname + '/public') ));
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

/*'routes' are instructions for urls*/

//this is what serves up your home page. So, if someone types "www.wheeltalk.com", this is the page they see
// app.get('/', function(req, res){
//   res.render('index', {
//     title: 'Home'
//   });
// });

app.get('/signup', function(req, res){
  res.render('signup', {
    title: 'Sign Up'
  });
});

app.get('/webapp', function(req, res){
	if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.redirect('/loginPage');
		}
  res.render('webapp', {
    title: 'Web App'
  });
});

app.get('/loginPage', function(req, res){
  res.render('login', {
    title: 'Log Up'
  });
});

app.get('/messages', function(req, res){
	if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.redirect('/loginPage');
		}
  res.render('messageboard', {
    title: 'Messages'
  });
});

// your homework -- create a route that serves up a different page. So, I want to be able to go to "www.wheeltalk.com/about" to learn more about the team. 

app.get('/', routes.index);
// this is the REST api you'll need to create to sign up a new user
app.post( '/new', routes.sendSMS);

app.post( '/respondtosms', routes.resSMS);

app.post( '/webSend', routes.webSend);

app.post('/login', routes.logIn);

