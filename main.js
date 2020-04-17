let cursor = document.getElementById("cursor");
let text_main = document.getElementById("text_main").innerHTML;
let restart_button = document.getElementById("restart"); 
let text_length = text_main.length;
let words = text_main.split(" ").length;
let cursor_visible = true;
let timer_started = false;
let analyze_wpm = true;
let start_time;
let end_time;
let error_count = 0;

window.onload = () => {
    reset();
}

setInterval(() => {
    if (cursor_visible) {
        cursor.style.visibility = "hidden";
        cursor_visible = false;
    } else {
        cursor.style.visibility = "visible";
        cursor_visible = true;
    }
}, 700)

document.addEventListener("keydown", (e) => {
    if (!timer_started && analyze_wpm) {
        timer_started = true;
        start_time = new Date().getTime();
    }

    if (analyze_wpm && timer_started) {
        if (text_main.length!=0) {
            if (text_main.charAt(0)==e.key) {
                text_main = text_main.split("").splice(1).join("");
                document.getElementById("text_main").innerHTML = text_main;

                if (text_main.length==0) {
                    analyze_wpm = false;
                    timer_started = false;
                    end_time = new Date().getTime();
                    let w = wpm(start_time, end_time, words);
                    let a = accuracy(error_count, text_length);
                    // console.log("WPM = " + w);
                    // console.log("Accuracy = " + a + "%");
                    updateModal(w, a);
                    document.getElementById("modal").style.visibility = "visible";
                }
            } else {
                error_count++;
            }
        }
    }
})

restart_button.addEventListener("click", () => {
    reset();
})

function wpm(start, end, length) {
    return Math.floor((length/((end-start)/60000)));
}

function accuracy(error_count, text_length) {
    return Math.floor((text_length-error_count)/text_length*100);
}

function reset() {
    error_count = 0;
    timer_started = false;
    analyze_wpm = true;
    document.getElementById("text_main").innerHTML = "type me to find out how many words per minute you can type";
    text_main = document.getElementById("text_main").innerHTML;
    text_length = text_main.length;
    words = text_main.split(" ").length;
    document.getElementById("modal").style.visibility = "hidden";
}

function updateModal(wpm, accuracy) {
    document.getElementById("wpm").innerHTML = wpm;
    document.getElementById("accuracy").innerHTML = accuracy + "%";
}