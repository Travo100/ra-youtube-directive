var express = require('express'),
    app = express(),
    request = require('request'),
    path = require('path'),
    bodyParser = require('body-parser');

//APP CONFIG ----
//use body parser so we can info from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//config app the handle CORS request
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'GET, POST');
  res.setHeader('Access-Control-Allow-Origin', 'X-Requested-With,content-type, Authorization');
  next();
});

//basic route for the home page
app.use(express.static(__dirname + '/public'));

// REGISTERING OUR ROUTES -----------------
// all of our routes will be prefixed with /api
// API ROUTES ------------------------
var apiRoutes = require('./routes/api')(app, express); 
app.use('/api', apiRoutes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(8000);
console.log('Listening on port 8000...');