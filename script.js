let Min = document.getElementById("Min");
let Sec = document.getElementById("Sec");
let mSec = document.getElementById("mSec");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let pauseBtn = document.getElementById("pauseBtn");
let lapBtn = document.getElementById("lapBtn");
let lapList = document.getElementById("lapList");

let intervalId;
let milisec = 0;
let second = 0;
let minute = 0;
let isRunning = false;
let lapCount = 1;

function updateDisplay(){
    mSec.innerText = milisec <= 9 ? `0${milisec}` : milisec;
    Sec.innerText = second <= 9 ? `0${second}` : second;
    Min.innerText = minute <= 9 ? `0${minute}` : minute;
}

function start(){
    if(isRunning){
        return;
    }

    isRunning = true;

    intervalId = setInterval(()=>{
        milisec++;

        if(milisec == 100){
            second++;
            milisec = 0;
        }

        if(second == 60){
            minute++;
            second = 0;
        }

        if(minute == 60){
            minute = 0;
            second = 0;
            milisec = 0;
        }

        updateDisplay();
    },10);
}

startBtn.addEventListener("click",()=>{
    start();
});

pauseBtn.addEventListener("click",()=>{
    clearInterval(intervalId);
    isRunning = false;
});

resetBtn.addEventListener("click",()=>{
    clearInterval(intervalId);

    milisec = 0;
    second = 0;
    minute = 0;
    isRunning = false;
    lapCount = 1;

    updateDisplay();
    lapList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
    if (minute === 0 && second === 0 && milisec === 0) {
        return;
    }

    let currentTime = `${Min.innerText}:${Sec.innerText}:${mSec.innerText}`;

    let li = document.createElement("li");

    li.className ="flex justify-between items-center bg-white/10 text-white px-4 py-3 rounded-lg";

    li.innerHTML = `
        <span class="text-cyan-300 font-bold">Lap ${lapCount}</span>
        <span>${currentTime}</span>`;

    lapList.prepend(li);

    lapCount++;
});