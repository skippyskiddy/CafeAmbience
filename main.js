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
ambienceSlider.addEventListener('input', function() {
    ambienceSound.volume = this.value / 100;
});

coffeeMachineSlider.addEventListener('input', function() {
    coffeeMachineSound.volume = this.value / 100;
});

coffeePotSlider.addEventListener('input', function() {
    coffeePotSound.volume = this.value / 100;
});

peopleSlider.addEventListener('input', function() {
  peopleSound.volume = this.value / 100;
});

document.addEventListener("DOMContentLoaded", function() {
    const video1 = document.getElementById("background-driving");
    const video2 = document.getElementById("background-nature");
    const switchButton = document.getElementById("switch-video");
    
    let currentVideo = 1;
  
    switchButton.addEventListener("click", function() {
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

// Initialize the timer display
updateTimerDisplay();

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
aboutButton.addEventListener('click', function() {
  modal.style.display = 'block';
});

// Close modal when 'x' button is clicked
closeButton.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Close modal when clicked outside of modal-content
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Add more code for additional functionalities (e.g., to switch to nature or lo-fi sounds)
