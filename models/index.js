var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/myTasks');

module.exports.Todo = require("./todo.js")