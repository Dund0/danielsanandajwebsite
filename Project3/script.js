console.log('here');

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

//check if clock is running
var running = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function zeroNum(time) {
    return '0' + time;
}

// Run a standard minute/second/hundredths timer:
function Timer() {
    
    var time = 0;
    var interval;
    var offset;

    function update(){
        time+= change();
        var formatTime = format(time);
        theTimer.textContent = formatTime;
    };
    function change(){
        var current = Date.now();
        var timePass = current - offset;
        offset = current;
        return timePass;
    };

    function format(unformattedTime){
        var time = new Date(unformattedTime);
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var mili = time.getMilliseconds().toString()    ;

        if(minutes.length < 2)
            minutes = zeroNum(minutes);
        if(seconds.length < 2)
            seconds = zeroNum(seconds);
        if(mili.length < 3)
            mili = zeroNum(mili);

        return minutes + ':' + seconds + ':' + mili;
    };

    this.start = function(){
            interval = setInterval(update, 10);
            offset = Date.now();
            running = true;
    };
    this.stop = function(){
            clearInterval(interval);
            interval = null;
            running = false;
    };
    this.reset = function(){
        theTimer.textContent = "00:00:000";
    };
}
//create the timer object to be used
var watch = new Timer();

// Match the text entered with the provided text on the page:
function matchedText(text){
    console.log('testing');
    if(text == originText) {
        watch.stop();
        testArea.setAttribute("disabled", "disabled");
    }

}
// Start the timer:
function startTimer() {
    watch.start();
}

// Reset everything:
function reset() {
    watch.stop();
    watch.reset();
    testArea.value = "";
    testArea.removeAttribute("disabled");
}

// Event listeners for keyboard input and the reset button:
//check for typing
testArea.addEventListener('keyup', function(){
    //if timer not running turn on the timer
    if(!running){
        startTimer();
    }

    //check if the text is equal
    matchedText(testArea.value);
    console.log('typing');
});

//reset button
resetButton.addEventListener('click', function(){
    reset();
});

