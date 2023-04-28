let caretAnimation = false;
let caretTimerID;
let lastInput = null;

document.getElementById("wordsInput").focus();

function startCaret(input) {
    caretTimerID = setInterval(animateCaret, 500, input);
    animateCaret(input);
}

function stopCaret(input) {
    clearInterval(caretTimerID);
    caretTimerID = null;
    input.value = input.value.replaceAll("_", "");
}

function animateCaret(input) {
    if(Date.now()-lastInput < 700)
        return;
    if(caretAnimation) {
        input.value = input.value + "_";
        caretAnimation = !caretAnimation;
    }
    else {
        input.value = input.value.slice(0, -1);
        caretAnimation = !caretAnimation;
    }
}

function caretInput(input, event) {
    if(caretTimerID !== null) {
        if(!caretAnimation) {
            if(input.value.charAt(input.value.length-2) !== "_") {
                input.value = input.value.slice(0, -1);
                caretAnimation = !caretAnimation;
                return;
            }
            input.value = input.value.replaceAll("_", "");
            input.value = input.value + "_";
            lastInput = Date.now();
        }
    }
}