// Initialize audio elements
const ambienceSound = new Audio('/Users/eliftirkes-usm/Desktop/CafeAmbience/Assets /ambience.mp3');
const coffeeMachineSound = new Audio('assets//Users/eliftirkes-usm/Desktop/CafeAmbience/Assets /coffee_machine.mp3.mp3');
const coffeePotSound = new Audio('/Users/eliftirkes-usm/Desktop/CafeAmbience/Assets /coffee_pot.mp3');
const peopleSound = new Audio('/Users/eliftirkes-usm/Desktop/CafeAmbience/Assets /people_talking.mp3');

// Set loop for audio elements
ambienceSound.loop = true;
coffeeMachineSound.loop = true;
coffeePotSound.loop = true;
peopleSound.loop = true;

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

// Add more code for additional functionalities (e.g., to switch to nature or lo-fi sounds)
