function textToSpeech(word) {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "EN";
    window.speechSynthesis.speak(utter)
}