var express = require('express');
var router  = express.Router();

var Tasks = require('../models/tasks');

router.get('/', function(req, res) {
	Tasks.find(function(err, tasks){
		if(err){
			console.log('error', err);
			res.send('OOPS?');
		}
		else {
			res.render('views/Home', {tasks: tasks});
		}
	});
})



	