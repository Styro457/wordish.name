let caretAnimation = false;
let caretTimerID;
let lastInput = null;

const caret = '_';

String.prototype.insert_at=function(index, string)
{
    return this.substring(0, index) + string + this.substring(index);
}

document.getElementById("wordsInput").focus();

function startCaret(input) {
    caretTimerID = setInterval(animateCaret, 500, input);
    animateCaret(input);
}

function stopCaret(input) {
    clearInterval(caretTimerID);
    caretTimerID = null;
    input.value = input.value.replaceAll(caret, "");
}

function caretOn(input) {
    const oldSelectionStart = input.selectionStart;
    const oldSelectionEnd = input.selectionEnd;
    input.value = input.value.insert_at(input.selectionStart, caret);
    input.selectionStart = oldSelectionStart;
    input.selectionEnd = oldSelectionEnd;
}

function caretOff(input) {
    const oldSelectionStart = input.selectionStart;
    const oldSelectionEnd = input.selectionEnd;
    input.value = input.value.replaceAll(caret, "");
    input.selectionStart = oldSelectionStart;
    input.selectionEnd = oldSelectionEnd;
}

function animateCaret(input) {
    if(input.selectionStart-input.selectionEnd !== 0 || Date.now()-lastInput < 700)
        return;

    if(caretAnimation) {
        if(!input.value.includes(caret))
            caretOn(input);
        else
            caretOff(input);
        caretAnimation = !caretAnimation;
    }
    else {
        caretOff(input);
        caretAnimation = !caretAnimation;
    }
}

function caretInput(input) {
    if(caretTimerID !== null) {
        if(!caretAnimation) {
            if(!input.value.includes("_")) {
                input.value = input.value.slice(0, -1);
                caretAnimation = !caretAnimation;
                return;
            }
            caretOff(input);
            caretOn(input);
            lastInput = Date.now();
        }
    }
}