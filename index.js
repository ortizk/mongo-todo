var express = require('express');
var bodyParser = require('bodyParser');
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded ({extended:false}));

app.get('/', function(req, res){
	res.send('STUB: HOME');
});

app.listen(3000);