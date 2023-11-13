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

function animateCaret(input) {
    if(input.selectionStart-input.selectionEnd !== 0)
        return;
    if(Date.now()-lastInput < 700)
        return;
    if(caretAnimation) {
        const oldSelectionStart = input.selectionStart;
        const oldSelectionEnd = input.selectionEnd;
        input.value = input.value.insert_at(input.selectionStart, caret);
        input.selectionStart = oldSelectionStart;
        input.selectionEnd = oldSelectionEnd;
        caretAnimation = !caretAnimation;
    }
    else {
        const oldSelectionStart = input.selectionStart;
        const oldSelectionEnd = input.selectionEnd;
        input.value = input.value.replaceAll(caret, "");
        caretAnimation = !caretAnimation;
        input.selectionStart = oldSelectionStart;
        input.selectionEnd = oldSelectionEnd;
    }
}

function caretMove(input) {
    const oldSelectionStart = input.selectionStart;
    const oldSelectionEnd = input.selectionEnd;
    input.value = input.value.replaceAll(caret, "");
    input.selectionStart = oldSelectionStart;
    input.selectionEnd = oldSelectionEnd;
    input.value = input.value.insert_at(input.selectionStart, caret);
    input.selectionStart = oldSelectionStart;
    input.selectionEnd = oldSelectionEnd;
    lastInput = Date.now();
}

function caretInput(input) {
    if(caretTimerID !== null) {
        if(!caretAnimation) {
            if(!input.value.includes("_")) {
                input.value = input.value.slice(0, -1);
                caretAnimation = !caretAnimation;
                return;
            }
            caretMove(input);
            lastInput = Date.now();
        }
    }
}