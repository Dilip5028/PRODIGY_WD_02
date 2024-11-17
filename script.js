let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.querySelector(".time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsList = document.querySelector(".laps");

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1000);
    }
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    updateDisplay();
    lapsList.innerHTML = "";
}

function addLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

// Event Listeners
startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);
