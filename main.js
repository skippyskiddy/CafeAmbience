// Initialize audio elements
const ambienceSound = new Audio('/Users/eliftirkes-usm/Desktop/CafeAmbience/Assets/ambience.mp3');
const coffeeMachineSound = new Audio('/Users/eliftirkes-usm/Desktop/CafeAmbience/Assets/coffee_machine.mp3.mp3');
const coffeePotSound = new Audio('/Users/eliftirkes-usm/Desktop/CafeAmbience/Assets/coffee_pot.mp3');
const peopleSound = new Audio('/Users/eliftirkes-usm/Desktop/CafeAmbience/Assets/people_talking.mp3');

// Set loop for audio elements
ambienceSound.loop = true;
coffeeMachineSound.loop = true;
coffeePotSound.loop = true;
peopleSound.loop = true;

//Pomodoro Ding
const timerCompleteSound = new Audio('/Users/eliftirkes-usm/Desktop/CafeAmbience/Assets/pomodoro_ding.mp3');

// Function to play all sounds
function playAllSounds() {
    ambienceSound.play();
    coffeeMachineSound.play();
    coffeePotSound.play();
    peopleSound.play();
}

// Function to pause all sounds
function pauseAllSounds() {
    ambienceSound.pause();
    coffeeMachineSound.pause();
    coffeePotSound.pause();
    peopleSound.pause();
}

// Get button elements
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

// Add event listeners to buttons to control playback
playButton.addEventListener('click', playAllSounds);
pauseButton.addEventListener('click', pauseAllSounds);

// Get slider elements
const ambienceSlider = document.getElementById('ambience-slider');
const coffeeMachineSlider = document.getElementById('coffee-machine-slider');
const coffeePotSlider = document.getElementById('coffee-pot-slider');
const peopleSlider = document.getElementById('people-slider');

// Add event listeners to sliders to adjust volume
ambienceSlider.addEventListener('input', function () {
    ambienceSound.volume = this.value / 100;
});

coffeeMachineSlider.addEventListener('input', function () {
    coffeeMachineSound.volume = this.value / 100;
});

coffeePotSlider.addEventListener('input', function () {
    coffeePotSound.volume = this.value / 100;
});

peopleSlider.addEventListener('input', function () {
    peopleSound.volume = this.value / 100;
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


/*
// Function to align pomodoro-controls with playPauseControls
function alignPomodoro() {
    const playPauseElement = document.getElementById('playPauseControls');
    const pomodoroElement = document.getElementById('pomodoro-controls');
  
    if(playPauseElement && pomodoroElement) {
      const playPauseRect = playPauseElement.getBoundingClientRect();
  
      // Set the 'left' and 'width' style property for pomodoro-controls
      pomodoroElement.style.left = `${playPauseRect.left}px`;
      pomodoroElement.style.width = `${playPauseRect.width}px`;
    }
  }
  
  // Call alignPomodoro whenever the window is resized
  window.addEventListener('resize', alignPomodoro);
  
  // Call the function once to set the initial position
  alignPomodoro();
  */


// Add more code for additional functionalities (e.g., to switch to nature or lo-fi sounds)
