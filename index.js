var express = require('express'),
  config = require('./config/config');

var app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  	console.log('Express server listening on port ' + config.port);
});


// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var methodOverride = require('method-override');
// var morgan = require('morgan');
// var favicon = require('serve-favicon');
// var errorhandler = require('errorhandler');
// var path = require('path');
// var consolidate = require('consolidate');
// var routes = require('./lib/routes');
// var config = require('./shared/lib/config');
// var util = require('util');



// var app = express();
// app.set('port', config.port);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
// app.engine('html', consolidate.handlebars);
// app.use(favicon(__dirname + '/static/images/favicon.ico'));
// app.use(morgan('combined'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride());
// app.use(cookieParser());



// app.use('/static', express.static(path.join(__dirname, 'static')));

// if ('development' == app.get('env')) {
//     app.use(errorhandler());
// }

// app.use('/', routes);

// // Handle health check
// app.use('/_health', function(req, res) {
//     res.send('200 I am alive', 200);
// });

// // Handle 404
// app.use(function (req, res) {
//     util.log('404: req.method=' + req.method + ', req.url=' + req.url);
//     res.send('404 Not Found', 404);
// });

// // Handle 500
// app.use(function (error, req, res, next) {
//     util.error('500: error=' + error + ', req.method=' + req.method + ', req.url=', req.url);
//     res.send('500 Internal Server Error', 500);
// });


// app.listen(config.port, function () {
//     console.log('Server listening on port ' + config.port);
// });


	


