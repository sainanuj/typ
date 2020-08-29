let cursor = document.getElementById("cursor");
let textMain = document.getElementById("text_main").innerHTML;
let restartButton = document.getElementById("restart");
let textLength = textMain.length;
let words = textMain.split(" ").length;
let cursorVisible = true;
let timerStarted = false;
let analyzeWpm = true;
let startTime;
let endTime;
let errorCount = 0;
let isCapslockOn;
let isShiftPressed;

window.onload = () => {
    reset();
}

setInterval(() => {
    if (cursorVisible) {
        cursor.style.visibility = "hidden";
        cursorVisible = false;
    } else {
        cursor.style.visibility = "visible";
        cursorVisible = true;
    }
}, 700)

document.addEventListener("keydown", function (e) {
    isCapslockOn = e.getModifierState('CapsLock');
    isShiftPressed = e.getModifierState('Shift');

    if (!timerStarted && analyzeWpm) {
        timerStarted = true;
        startTime = new Date().getTime();
    }

    if (analyzeWpm && timerStarted) {
        if (textMain.length != 0) {
            if (e.key != 'Shift' && e.key != 'CapsLock') {
                if (textMain.charAt(0) == e.key) {
                    textMain = textMain.split("").splice(1).join("");
                    document.getElementById("text_main").innerHTML = textMain;
    
                    if (textMain.length == 0) {
                        analyzeWpm = false;
                        timerStarted = false;
                        endTime = new Date().getTime();
                        let w = wpm(startTime, endTime, words);
                        let a = accuracy(errorCount, textLength);
                        // console.log("WPM = " + w);
                        // console.log("Accuracy = " + a + "%");
                        updateModal(w, a);
                        document.getElementById("modal").style.visibility = "visible";
                    }
                } else {
                    errorCount++;
                }
            }
        }
    }
})

restartButton.addEventListener("click", () => {
    reset();
})

function wpm(start, end, length) {
    return Math.floor((length / ((end - start) / 60000)));
}

function accuracy(error_count, text_length) {
    return Math.floor((text_length - error_count) / text_length * 100);
}

function reset() {
    errorCount = 0;
    timerStarted = false;
    analyzeWpm = true;
    document.getElementById("text_main").innerHTML = "Type me to find out how many words per minute you can type!";
    textMain = document.getElementById("text_main").innerHTML;
    textLength = textMain.length;
    words = textMain.split(" ").length;
    document.getElementById("modal").style.visibility = "hidden";
}

function updateModal(wpm, accuracy) {
    document.getElementById("wpm").innerHTML = wpm;
    document.getElementById("accuracy").innerHTML = accuracy + "%";
}