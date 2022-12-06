const synth = window.speechSynthesis

function textToSpeech(word) {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "EN";
    synth.speak(utter)
}

