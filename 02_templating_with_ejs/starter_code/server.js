// Require modules
var express = require('express');
var routes = require('./config/routes');
var bodyParser = require('body-parser');
var path = require('path');

// Create the Express app
var app = express();

// Configure the app (app.set)
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Mount middleware (app.use)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// require and mount (app.use) routes
app.use('/', routes);

// Tell the app to listen on port 3000
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('magic is happening on port ' + port);
});
