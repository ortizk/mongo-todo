var express    = require('express');
var bodyParser = require('body-parser');
// var mongoose   = require('mongoose');
var app        = express();
// var Todo        = require('./models/todo');
var db         = require('./models');

// mongoose.connect('mongodb://localhost/myTasks');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded ({extended:false}));

// displaying home page
app.get('/', function(req, res) {
	res.render('Home');
})

//getting all tasks
app.get('/api/todos', function(req, res){
	db.Todo.find(function (err, tasks) {
		if (err) {
			console.log("index error: " + err);
			res.sendStatus(500)
		}
		console.log(tasks);
		res.json(tasks);
	});
});


// create new task
app.post('/api/todos', function (req, res) {
	console.log("post");
	console.log(req.body);
	var newTodo = new db.Todo({task: req.body.task, description: req.body.description})
	newTodo.save(function() {
		res.json(newTodo);
	});
})

// delete task
app.delete('/api/todos/:id', function (req, res) {
  var taskId = req.params.id;
  console.log("we got to app.delete in server.js");
  db.Todo.findOneAndRemove({_id: taskId}, function(err,task){
    console.log('task to delete', req.params);
    res.json(task);
  })
});


// //should be in routes
// app.put('/api/todos/:id' (req, res) => {

// 	res.render('Home')

// })

// //another way---use this when trying to unpdate a post from a specific user
// app.put("users/:id/tweets/:tweet_id", (req, res) => {
// 	let newTweetData = req.body;
// 	Tweet.findByIdAndUpdate(req.params.tweet_id, newTweetData, null, () =>{
// 		res.redirect("/user/" + req.params.id + 
// 			"/tweets/" + req.params.tweet_id);
// 	});
// });

// app.listen(3000);
  app.set('port', process.env.PORT || 3001)

  app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })

