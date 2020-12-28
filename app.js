// Track Number of tasks and tasks completed
let tasks = 0;
let tasksDone = 0;

// EVENTS

// DELETE Button Stuff
$('#todoList').on('click', '.task-delete-btn', function() {
    $(this).parent().remove();
    
    // subtract 1 from tasks and update progress bar
    tasks -= 1;
    updateProgressBar();
});

// DONE/TASK COMPLETE button stuffs
$('#todoList').on('click', '.task-complete-btn', function() {
    // replace task-complete-btn class with completed and complete-left class
    // and remove button text
    $(this).text('').addClass('completed complete-left').removeClass('task-complete-btn');

    // Replace task with Task Completed and add completed class
    $(this).siblings('.task').text("Task Completed").addClass('completed');

    // replace task-delete-btn class with completed and complete-right class
    // also replace text with &check;
    $(this).siblings('.task-delete-btn').html('&check;').addClass('completed complete-right').removeClass('task-delete-btn');

    // add one to tasksDone and update progress bar
    tasksDone += 1;
    updateProgressBar();
});

// POP UP modal when user clicks Add Task Btn
$("#addTask").click(function() {
    $('.modal').addClass('show-modal');
});

// CLOSE the modal
$('.close-button, .cancelBtn').click(function() {
    $('.modal').removeClass('show-modal');
});

// ADD NEW TASK to the list
$('.okBtn').click(function() {
    let task = $('#newTask').val();
    $( "#todoList" ).append( 
        `<li>
            <div class="task-complete-btn">
                Done
            </div>
            <div class="task">
                ${task}
            </div>
            <div class="task-delete-btn">
                Delete
            </div>
        </li>`
        );
    $('.modal').removeClass('show-modal');

    // add one to tasks and update progress bar
    tasks += 1;
    updateProgressBar();
});

// RESET -- clear list and hide fireworks display screen
$('#reset').click(function() {
    //clear list items
    $('#todoList').html('');
    //end fireworks
    $('canvas').remove();
    //hide .gameover and #reset
    $('.gameover, #reset').fadeOut('fast');

    // Reset tasks and update progress bar
    tasks = 0;
    tasksDone = 0;
    $('.progressBar').css("height", 0).text('');
});

// FUNCTIONS

//Update progress bar
function updateProgressBar() {
    // percentComplete = tasksDone / tasks (round to the nearest integer)
    let percentComplete = Math.round((tasksDone / tasks) * 100);
    
    // change progressbar height to percentComplete
    // change text to percent complete
    $('.progressBar').animate({height: `${percentComplete}%`}, 1000, 'swing').text(`${percentComplete}%`);

    // Fireworks animation if percentComplete = 100;
    if(percentComplete === 100) {
        window.setTimeout( workCompleteDisplay(), 1000);
    }
}

// Call this when User had completed all tasks
function workCompleteDisplay() {
    $('.contain').fireworks({
        opacity: 1,
        width: '100%',
        height: '100%'
    });
    $('.gameover, #reset').fadeIn('slow');
}