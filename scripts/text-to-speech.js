function textToSpeech(word) {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "EN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
}