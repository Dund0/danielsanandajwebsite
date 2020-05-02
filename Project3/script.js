const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
//const originText = document.querySelector("#origin-text p").innerHTML;
const setOriginText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const newButton = document.querySelector("#new");
const theTimer = document.querySelector(".timer");
const numErrors = document.querySelector("#errors");
const wpmW = document.querySelector("#wpm");

//array of texts
var strings = [
"Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.", 
"This is test text for the typing program, see how fast you can type this sentence.",
"The quick brown fox jumps over the lazy dog",
"The text to test."
];

//array for word count
var wordCount = [
138, 16, 9, 4
];

//check if clock is running
var running = false;
//number of errors
var errors = 0;
//words per minute
var wpm = 0;
//check for backspace
var old = 0;
//check for error
var error = false;
//number for picking text
var num = -1;
//formatted time
var minutes = '', seconds = '', mili = '';

//pick random string
function randomString() {
    num = Math.floor(Math.random() * strings.length);

    setOriginText.innerHTML = strings[num];
    originText = document.querySelector("#origin-text p").innerHTML;
}
randomString();

// Add leading zero to numbers 9 or below (purely for aesthetics):
function zeroNum(time) {
    return '0' + time;
}

// Run a standard minute/second/hundredths timer:
function Timer() {
    
    //variables
    var time = 0;
    var interval;
    var offset;

    //update the current time every 10ms
    function update(){
        time += change();
        formatTime = format(time);
        theTimer.textContent = formatTime;
    };
    //find how much time passed
    function change(){
        var current = Date.now();
        var timePass = current - offset;
        offset = current;
        return timePass;
    };

    //format the time
    function format(unformattedTime){
        var time = new Date(unformattedTime);
        minutes = time.getMinutes().toString();
        seconds = time.getSeconds().toString();
        mili = time.getMilliseconds().toString();

        //add zeroes if necessary
        if(minutes.length < 2)
            minutes = zeroNum(minutes);
        if(seconds.length < 2)
            seconds = zeroNum(seconds);
        if(mili.length < 3)
            mili = zeroNum(mili);

        return minutes + ':' + seconds + ':' + mili;
    };

    //start the clock
    this.start = function(){
        interval = setInterval(update, 10);
        offset = Date.now();
        running = true;
    };
    //stop the clock
    this.stop = function(){
        clearInterval(interval);
        interval = null;
        running = false;
    };
    //reset the clock
    this.reset = function(){
        time = 0;
        theTimer.textContent = "00:00:000";
    };
}
//create the timer object to be used
var watch = new Timer();

// Match the text entered with the provided text on the page:
function matchedText(text, key){
    //if the text is equal stop the click and disable the text box and make the border green
    if(text == originText) {
        var time = getMin();
        watch.stop();
        testWrapper.style.border = "10px solid green";
        testArea.setAttribute("disabled", "disabled");
        numErrors.textContent = 'Errors: ' + errors;
        wpm = wordCount[num] / time;
        wpmW.textContent = 'Words per minute: '+ Math.trunc(wpm);
    }
    //if there is an error check if the user went back to the start of the error if he didnt and made an error count that doesnt count backspaces
    else if(error){
        if(old == text.length) {
            error = false;
            testWrapper.style.border = "10px solid blue";
        }
        else {
            if(originText.charAt(text.length-1) != text.charAt(text.length-1) && key.keyCode != 8)
                errors++;
            testWrapper.style.border = "10px solid red";
        }
    }
    //if there was an error mark error and count and make border red
    else if(originText.charAt(text.length-1) != text.charAt(text.length-1)) {
        error = true;
        testWrapper.style.border = "10px solid red";
        if(key.keyCode != 8) {
               errors++;
        }
    }
    //if there was no error make the border blue
    else if(originText.charAt(text.length-1) == text.charAt(text.length-1)) {
        error = false;
        old = text.length;
        testWrapper.style.border = "10px solid blue";
    }
    //no error mark the lested no error point
    else if (!error){
        old = text.length;
    }
}
// Start the timer:
function startTimer() {
    watch.start();
}

// Reset everything:
function reset(a) {
    watch.stop();
    watch.reset();
    testArea.value = "";
    testArea.removeAttribute("disabled");
    testWrapper.style.border = "10px solid grey"
    numErrors.textContent = "";
    errors = 0;
    wpmW.textContent = "";
    wpm = 0;
    if(a == 1)
        randomString();
}

// Event listeners for keyboard input and the reset button:
//check for typing
testArea.addEventListener('keyup', function(a){
    //if timer not running turn on the timer
    if(!running && testArea.value.length > 0){
        startTimer();
    }

    //check if the text is equal
    matchedText(testArea.value, a);
    //console.log('typing');
});

//reset button
resetButton.addEventListener('click', function(){
    reset();
});

newButton.addEventListener('click', function(){
    reset(1);
});

//calculate minutes for wpm
function getMin() {
    return parseInt(minutes) + (parseInt(seconds)/60) + (parseInt(mili)/60000);
}