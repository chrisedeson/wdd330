const countdownDisplay = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const message = document.getElementById('message');
const customTimeInput = document.getElementById('customTime');

let countdownInterval;
let timeLeft = 10;
let isPaused = false;

// Start Countdown when the button is clicked
startButton.addEventListener('click', () => {
    // Get the custom starting time if provided
    const customTime = parseInt(customTimeInput.value);
    if (customTime && customTime > 0) {
        timeLeft = customTime;
    } else {
        timeLeft = 10; // Default to 10 seconds if no valid input
    }
    // Reset the message
    message.textContent = '';
    
    // Display the initial countdown time
    countdownDisplay.textContent = timeLeft;
    
    // Disable the start button to prevent multiple countdowns
    startButton.disabled = true;

    // Start the countdown interval
    countdownInterval = setInterval(() => {
        if (timeLeft > 0 && !isPaused) {
            countdownDisplay.textContent = timeLeft;
            timeLeft--;
        } else if (timeLeft <= 0) {
            // Stop the countdown when it reaches 0
            clearInterval(countdownInterval);
            countdownDisplay.textContent = 'Time\'s up!';
            message.textContent = 'Time\'s up!';
            startButton.disabled = false;
        }
    }, 1000);

    // Show the Pause button
    pauseButton.style.display = 'inline-block';
    resumeButton.style.display = 'none';
});

// Pause the countdown
pauseButton.addEventListener('click', () => {
    isPaused = true;
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'inline-block';
});

// Resume the countdown
resumeButton.addEventListener('click', () => {
    isPaused = false;
    pauseButton.style.display = 'inline-block';
    resumeButton.style.display = 'none';
});
