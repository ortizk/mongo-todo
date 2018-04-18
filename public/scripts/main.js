console.log("js is working");

var $tasksList;
var allTasks = [];

$(document).ready(function() {

	// get all tasks
	$tasksList = $('#taskTarget');
	$.ajax({
		method: 'GET',
		url: '/api/todo',
		success: handleSuccess,
		error: handleError
	});

	// create new task
	$('#newTaskForm').on('submit', function(e) {
		e.preventDefault();
		// $.ajax({
		// 	method: 'POST',
		// 	url: '/api/todo',
		// 	data: $(this).serialize(),
		// 	success: newTaskSuccess,
		// 	error: newTaskError
		// });
	})
	// delete task
  $tasksList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/todo/'+$(this).attr('data-id'));
    // $.ajax({
    //   method: 'DELETE',
    //   url: '/api/todo/'+$(this).attr('data-id'),
    //   success: deleteTaskSuccess,
    //   error: deleteTaskError
    // });
  });
});

function getTaskHtml(task) {
  return `<hr>
          <p>
            <b>${task.task}</b>
            : ${task.description}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${task._id}>Delete</button>
          </p>`;
}

function getAllTasksHtml(tasks) {
  return tasks.map(getTaskHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $tasksList.empty();

  // pass `allTasks` into the template function
  var tasksHtml = getAllTasksHtml(allTasks);

  // append html to the view
  $tasksList.append(tasksHtml);
};

function handleSuccess(json) {
  allTasks = json;
  console.log("got to handle sucess!")
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#taskTarget').text('Failed to load tasks, is the server working?');
}

function newTaskSuccess(json) {
  $('#newTaskForm input').val('');
  allTasks.push(json);
  render();
}

function newTaskError() {
  console.log('newTask error!');
}

function deleteTaskSuccess(json) {
  var task = json;
  console.log(json);
  var taskId = task._id;
  console.log('delete task', taskId);
  // find the task with the correct ID and remove it from our allTasks array
  for(var index = 0; index < allTasks.length; index++) {
    if(allTasks[index]._id === taskId) {
      allTasks.splice(index, 1);
      break;  // we found our task - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteTaskError() {
  console.log('deleteTask error!');
}