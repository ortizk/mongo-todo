var express    = require('express');
var bodyParser = require('body-Parser');
// var mongoose   = require('mongoose');
var app        = express();
// var Todo        = require('./models/todo');
var db         = require('./models');

// mongoose.connect('mongodb://localhost/myTasks');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded ({extended:false}));


app.get('/', function(req, res){
	console.log(db.myTasks);
	res.render('Home');
});

app.get('/api/todo', function(req, res){
	db.Todo.find(function (err, tasks) {
		if (err) {
			console.log("index error: " + err);
			res.sendStatus(500)
		}
		console.log(tasks);
		res.json(tasks);
	})
})


// create new task
app.post('/api/todos', function (req, res) {
	var newTodo = new db.Todo({task: req.body.task, description: req.body.description})
	newTask.save();
	res.json(newTask);
})

app.listen(3000);

