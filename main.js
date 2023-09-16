const sounds = [
    { name: 'ambienceSound', audio: new Audio('./Assets/ambience.mp3')},
    { name: 'coffeeMachineSound', audio: new Audio('./Assets/coffee_machine.mp3')},
    { name: 'coffeePotSound', audio: new Audio('.Assets/coffee_pot.mp3')},
    { name: 'peopleSound', audio: new Audio('./Assets/people_talking.mp3')},
    { name: 'crashingWavesSound', audio: new Audio('./Assets/crashing_waves.mp3')},
    { name: 'rainyDaySound', audio: new Audio('./Assets/rainy_day.mp3')},
    { name: 'whiteNoiseSound', audio: new Audio('./Assets/white_noise.mp3')},
    { name: 'pinkNoiseSound', audio: new Audio('./Assets/pink_noise.mp3')}
]

// Set loop for audio elements
sounds.forEach(sound => sound.audio.loop = true);

//Pomodoro Ding
const timerCompleteSound = new Audio('./Assets/pomodoro_ding.mp3');

// Function to play all sounds
function playAllSounds() {
    sounds.forEach(soundObj => soundObj.audio.play());
}

// Function to pause all sounds
function pauseAllSounds() {
    sounds.forEach(soundObj => soundObj.audio.pause());
}

document.getElementById("toggleButton").addEventListener("click", function() {
    const allPaused = sounds.every(soundObj => soundObj.audio.paused);
   
    const iconElement = this.querySelector("i"); // Gets the i element inside the button

    if (allPaused) {
      playAllSounds();
      iconElement.className = "fas fa-volume-up"; // Sets class for Pause icon
    } else {
      pauseAllSounds();
      iconElement.className = "fas fa-volume-mute"; // Sets class for Play icon
    }
});
  

// Get slider elements


document.addEventListener("DOMContentLoaded", function() {
  
    sounds.forEach(soundObj => {
      const slider = document.getElementById(`${soundObj.name}-slider`);
      
      if (slider) {        
        slider.addEventListener('input', function () {
          soundObj.audio.volume = this.value / 100;
        });
      } else {
        console.log('Slider does not exist: ', `${soundObj.name}-slider`);  // Debugging line
      }
    });
});

document.addEventListener("DOMContentLoaded", function() { // expand controller
    const sliderControls = document.getElementById('sliderControls');
    const expandButton = document.getElementById('expand-button');

    expandButton.addEventListener('click', function() {
        if (sliderControls.classList.contains('expanded')) {
            sliderControls.classList.remove('expanded');
        } else {
            sliderControls.classList.add('expanded');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const video1 = document.getElementById("background-driving");
    const video2 = document.getElementById("background-nature");
    const switchButton = document.getElementById("switch-video");

    let currentVideo = 1;

    switchButton.addEventListener("click", function () {
        if (currentVideo === 1) {
            video1.style.display = "none";
            video2.style.display = "block";
            video2.play();  // Start playing the second video
            currentVideo = 2;
        } else {
            video2.style.display = "none";
            video1.style.display = "block";
            video1.play();  // Start playing the first video
            currentVideo = 1;
        }
    });
});

// Pomodoro Timer 
let isTimerRunning = false;
let timerInterval;
let timeLeft = 25 * 60;
let cycleCount = 0;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const cycleCountDisplay = document.getElementById('cycle-count');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerCompleteSound.play();
            isTimerRunning = false;
            timeLeft = 25 * 60;
            cycleCount++;
            localStorage.setItem('cycleCount', cycleCount); // Save the cycle count to localStorage
            cycleCountDisplay.textContent = `Cycles: ${cycleCount}`;
            updateTimerDisplay();
            return;
        }

        timeLeft--;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    isTimerRunning = false;
    timeLeft = 25 * 60; // Reset timer to 25 minutes
    updateTimerDisplay();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);


// Get modal element and buttons
const modal = document.getElementById('about-modal');
const aboutButton = document.getElementById('about-button');
const closeButton = document.querySelector('.close-button');

// Show modal when "About" button is clicked
aboutButton.addEventListener('click', function () {
    modal.style.display = 'block';
});

// Close modal when 'x' button is clicked
closeButton.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Close modal when clicked outside of modal-content
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

//To Do list with local storage
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById('add-todo');
    const clearAllButton = document.getElementById('clear-all');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

      // Load the cycle count for pomodoro from localStorage
      cycleCount = localStorage.getItem('cycleCount') ? parseInt(localStorage.getItem('cycleCount')) : 0;
      cycleCountDisplay.textContent = `Cycles: ${cycleCount}`;
  
      // Get the "Refresh Cycle" button and add an event listener
      const refreshCycleButton = document.getElementById('refresh-cycles-button');
      
      refreshCycleButton.addEventListener('click', function() {
          // Reset the cycle count to 0
          cycleCount = 0;
          localStorage.setItem('cycleCount', cycleCount);
          cycleCountDisplay.textContent = `Cycles: ${cycleCount}`;
      });
    
    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (const task of savedTasks) {
        addTaskToList(task);
    }

    // Maximum number of tasks
    const maxTasks = 10;

    // Add a task when the "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // New code for adding a task when Enter is pressed
    todoInput.addEventListener('keyup', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

    // Refactored adding task logic into a function so it can be used in both places
    function addTask() {
        const task = todoInput.value;
        if (task.length > 30) {
            alert("Task should be 50 characters or less");
            return;
        }
        if (task) {
            if (savedTasks.length < maxTasks) {
                addTaskToList(task);
                savedTasks.push(task);
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
                todoInput.value = '';
            } else {
                alert('Finish some of your tasks before adding more!');
            }
        }
    }

    clearAllButton.addEventListener('click', () => {
        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }
        localStorage.removeItem('tasks');
        savedTasks.length = 0;  // Clear the array
    });

    function addTaskToList(task) {
        const newTodo = document.createElement('li');
        newTodo.className = 'todo-item flex justify-between items-center'; // Add Flexbox
        const taskText = document.createElement('span');
        taskText.textContent = task;
        newTodo.appendChild(taskText);

        // Container for buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex items-center';

        //  Complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded';
        completeButton.addEventListener('click', function () {
            taskText.classList.toggle('checked-item');
        });

        buttonContainer.appendChild(completeButton);

        // Create delete button with Tailwind classes
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.className = 'ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded';
        deleteButton.addEventListener('click', function () {
            // Go two levels up (to the li element) and remove it
            this.parentElement.parentElement.remove();

            const index = savedTasks.indexOf(task);
            if (index > -1) {
                savedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
            }
        });

        buttonContainer.appendChild(deleteButton);
        newTodo.appendChild(buttonContainer); // Append the button container instead

        todoList.appendChild(newTodo);
    }
});


  