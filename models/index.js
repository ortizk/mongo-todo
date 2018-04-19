var mongoose   = require('mongoose');

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  
	mongoose.connect('mongodb://localhost/myTasks');
}

module.exports.Todo = require("./todo.js")